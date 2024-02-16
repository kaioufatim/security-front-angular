import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest,LoginResponse } from '../models/login.model';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedUser } from '../models/loggedUser.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelperService =new JwtHelperService();
  user = new BehaviorSubject<LoggedUser | null>(null)
  tokenExpirationTimer:any;

  constructor(private http:HttpClient,private router:Router) { }
  
  public login(user:LoginRequest):Observable<LoginResponse>{
    const formData = new FormData;
    formData.append('username',user.username);
    formData.append('password',user.password);
    return this.http.post<LoginResponse>(environment.backendHost + "/login",formData)

  }
  saveToken(jwtTokens : LoginResponse ){
    const decodedAccessToken =this.jwtHelperService.decodeToken(jwtTokens.accessToken);
    const loggedUser = new LoggedUser(decodedAccessToken.sub,decodedAccessToken.role,jwtTokens.accessToken,this.getExpirationDate(decodedAccessToken.exp));
    this.user.next(loggedUser)

  }
  redirectLoggedInUse(decodedToken: any, accessToken: string){
    if(decodedToken.role.includes("ADMIN")) this.router.navigateByUrl("/patient");
    else if(decodedToken.role.includes("RESPONSABLE")){
      this.router.navigateByUrl("/patient")
    }
    else if(decodedToken.role.includes("TECHNICIEN")){
      this.router.navigateByUrl("/analyse")
    }
  }
  autoLogin(){
    const userData : {
      username:string,
      role:string,
      _token:string,
      _expiration:Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const loadedUser = new LoggedUser(userData.username,userData.role,userData._token,new Date(userData._expiration))
    if (loadedUser.token){
      this.user.next(loadedUser);
      this.autoLogout(loadedUser._expiration.valueOf()-new Date().valueOf());
    }
  }
  logout(){
    localStorage.clear();
    this.user.next(null);
    this.router.navigate(['/'])
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  

  getExpirationDate(exp : number){
    const date =new Date(0);
    date.setUTCSeconds(exp)
    return date;

  }
  
  autoLogout(expirationDuration : number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    },expirationDuration)

  }

}
