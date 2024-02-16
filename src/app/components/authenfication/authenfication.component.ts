import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authenfication',
  templateUrl: './authenfication.component.html',
  styleUrls: ['./authenfication.component.css']
})
export class AuthenficationComponent implements OnInit {

  loginFormGroup : FormGroup;
  submited:boolean=false;
  errorMessage !:string;
  


  constructor(private fb : FormBuilder,private authService:AuthService) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username : ["",[Validators.required, Validators.pattern]],
      password :["",Validators.required],
      
    })
  }
  onLogin() {
    this.submited = true;
    if (this.loginFormGroup.invalid) return;
    this.authService.login(this.loginFormGroup.value).subscribe({
      next: (loginResponse) => {
        this.authService.saveToken(loginResponse)
        console.log(loginResponse);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage="An error accured";
      }
    });
  }
  

}
