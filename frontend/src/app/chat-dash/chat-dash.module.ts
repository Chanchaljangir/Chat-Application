import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
// import "~@angular/material/prebuilt-themes/indigo-pink.css";
import { MatDialogModule} from '@angular/material';
import 'hammerjs';
import { AddGroupComponent } from './add-group/add-group.component';


@NgModule({
  declarations: [DashboardComponent, ChatComponent, AddGroupComponent],
  imports: [
    CommonModule, 
    FormsModule,
    BrowserAnimationsModule,NoopAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatMenuModule,MatIconModule,MatDialogModule  
  ],
  entryComponents:[
    AddGroupComponent
  ],
  exports: [MatButtonModule, MatCheckboxModule,MatIconModule,MatDialogModule ],
})
export class ChatDashModule { }
