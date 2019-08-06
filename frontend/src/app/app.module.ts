import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ChatDashModule } from './chat-dash/chat-dash.module';
import { ChatcommServiceService } from './shared/chatcomm-service.service';
import { ChatHeaderComponent } from './shared/header/chat-header/chat-header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChatHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ChatDashModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatMenuModule,MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass:'toast-top-right',
      tapToDismiss:false,
    }),
  ],
  providers: [ChatcommServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
