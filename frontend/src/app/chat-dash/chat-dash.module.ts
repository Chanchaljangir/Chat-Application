import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, ChatComponent],
  imports: [
    CommonModule,
    FormsModule     
  ]
})
export class ChatDashModule { }
