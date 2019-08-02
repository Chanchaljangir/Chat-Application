import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ChatDashModule } from './chat-dash/chat-dash.module';
import { ChatcommServiceService } from './shared/chatcomm-service.service';
import { ChatHeaderComponent } from './shared/header/chat-header/chat-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ChatDashModule
  ],
  providers: [ChatcommServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
