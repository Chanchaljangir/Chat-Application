import { Component, OnInit } from '@angular/core';
import { ChatcommServiceService } from 'src/app/shared/chatcomm-service.service';
import {MatDialog} from '@angular/material/dialog';
import { AddGroupComponent } from '../add-group/add-group.component';
import { ChatServiceService } from 'src/app/shared/services/chat/chat-service.service';
import { group } from '@angular/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 selectedGroup=String;
 user: string="";
 joinList:any[]=[];
 msgList:any[]=[];
 msg:String;
 groups:any[];
 users:any[];
  constructor(private chatcommService:ChatcommServiceService,public dialog: MatDialog, private chatService:ChatServiceService) { }

  ngOnInit() {
    // document.getElementById("action_menu").style.visibility="hidden";
    this.chatcommService.joinNewGroup().subscribe(
      (res)=>{
        console.log('Server response is ',res);
        this.joinList.push(res);
      },
      (err)=>{
        console.log('server err is ',err);
      }
    ); 

    //start chat
    this.chatcommService.startChat().subscribe(
      (res)=>{
        console.log('user start chat ',res);
        this.msgList.push(res);
      },
      (err)=>{
        console.log('chat err is ',err);
      }
    );

    //left group
    this.chatcommService.userLeftGroup().subscribe(      
      (res)=>{
      console.log('user leave the group... ',res);
      this.msgList.push(res);
    },
    (err)=>{
      console.log('user leave err: ',err);
    })

//get groups
this.chatService.getGroup().subscribe(data=>{
  if(data.success){
      // console.log("groups are ", data);
      // console.log("gp is ",data.res[0].groupName);
      this.groups=data.res;  
      console.log("group are ",this.groups);
}
else{ 
  console.log("not get any group some error");
} 
});

//get users
this.chatService.getUsers().subscribe(data=>{
  if(data.success){
      // console.log("groups are ", data);
      // console.log("gp is ",data.res[0].groupName);
      this.users=data.res;  
      console.log("users are ",this.users);
}
else{ 
  console.log("not get any group some error");
} 
});

  }
  chooseGroup(selectGroup){
    console.log("slected group is", selectGroup);
    this.chatcommService.joinGroup(this.user,selectGroup);
    this.selectedGroup=selectGroup;
  }
  sendMessage(){
    console.log("send btn works...");
    this.chatcommService.sendAnyMessage(this.user,this.msg,this.selectedGroup);
  }
  leave(){
    this.chatcommService.leaveGroup({name:this.user,group:this.selectedGroup});
  }
  openDialog():void {
    let MatDialogRef=this.dialog.open(AddGroupComponent,{
      data:"MyVar"
    })
    MatDialogRef.afterClosed().subscribe(result=>{
      console.log("dialog was closed");
      console.log("dialog result is",result);
    })
  }  
}
 