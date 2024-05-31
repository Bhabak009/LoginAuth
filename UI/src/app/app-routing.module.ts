import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateComponent } from './state/state.component';
import { LoginComponent } from './login/login.component';
import { DistComponent } from './dist/dist.component';
import {  AuthGuard } from './auth.guard';



const routes: Routes = [
  {path:'login',component:LoginComponent},
  // {path:'state',component:StateComponent},
 {path:'state',component:StateComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'login',pathMatch:'full'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
