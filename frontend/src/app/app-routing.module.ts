import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './chat-dash/dashboard/dashboard.component';
import { ChatComponent } from './chat-dash/chat/chat.component';


const routes: Routes = [

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
