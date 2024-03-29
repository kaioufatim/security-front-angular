import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './userlab/index/index.component';
import { CreateComponent } from './userlab/create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateComponent } from './userlab/update/update.component';

import { CreateComponent as CreateCFournisseur } from './fournisseur/create/create.component';
import { IndexComponent as IndexCFournisseur } from './fournisseur/index/index.component';
import { UpdateComponent as UpdateCFournisseur } from './fournisseur/update/update.component';

import { CreateComponent as CreateCReagent } from './reagent/create/create.component';
import { IndexComponent as IndexCReagent } from './reagent/index/index.component';
import { UpdateComponent as UpdateCReagent } from './reagent/update/update.component';
import { AuthenficationComponent } from './components/authenfication/authenfication.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userlab', redirectTo: 'post/index', pathMatch: 'full' },
  { path: 'userlab/index', component: IndexComponent },
  { path: 'userlab/create', component: CreateComponent },
  { path: 'userlab/update/:id', component: UpdateComponent },
  //fournisseur:
  { path: 'fournisseur', redirectTo: 'post/index', pathMatch: 'full' },
  { path: 'fournisseur/index', component: IndexCFournisseur },
  { path: 'fournisseur/create', component: CreateCFournisseur },
  { path: 'fournisseur/update/:id', component: UpdateCFournisseur },
  //reagent:
  { path: 'reagent', redirectTo: 'post/index', pathMatch: 'full' },
  { path: 'reagent/index', component: IndexCReagent },
  { path: 'reagent/create', component: CreateCReagent },
  { path: 'reagent/update/:id', component: UpdateCReagent },
  //
  {path:'auth',component:AuthenficationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
