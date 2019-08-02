import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './chat-dash/dashboard/dashboard.component';
import { ChatComponent } from './chat-dash/chat/chat.component';


const routes: Routes = [
  {
    path:'login' ,component:LoginComponent
  },
  {
    path:'signup', component:SignupComponent
  },
  {
    path:'dashboard',component:DashboardComponent
  },
  {
    path:'chat', component:ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
