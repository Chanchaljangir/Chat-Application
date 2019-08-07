import { Component, OnInit } from '@angular/core';
import { ChatcommServiceService } from 'src/app/shared/chatcomm-service.service';
import {MatDialog} from '@angular/material/dialog';
import { AddGroupComponent } from '../add-group/add-group.component';
import { ChatServiceService } from 'src/app/shared/services/chat/chat-service.service';
// import { group } from '@angular/animations';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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
 checkGpAvaliabl=false;
 chatForm:FormGroup; 
  getmsg: any[];
  constructor(private chatcommService:ChatcommServiceService,public dialog: MatDialog, private chatService:ChatServiceService) { }

  ngOnInit() {
    this.chatForm = new FormGroup({
      'msg' : new FormControl(null) 
  }); 

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
        // console.log('user start chat ',res.user);
        this.msgList.push(res);
        this.chatService.addChat(res).subscribe(data=>{
          if(data.success){
              console.log("chat stats...... ", data); 
        }
        else{ 
          // console.log(data);
          console.log('err genrate at time of pusing chat');
          
        }} );
      }, 
      (err)=>{
        console.log('chat err is ',err);
      });
//get odd chat
this.chatService.getChat().subscribe(data=>{
    if(data.success)
    {console.log("get chat data is ",data.res);
    console.log("get chat data msg only ",data.res[0].msg);
  this.getmsg=data.res;
console.log("get msg is ", this.getmsg)}
}); 
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

console.log("cureent user is ",this.user);
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
 //check group avaliablibility
 if(this.selectedGroup){
  this.checkGpAvaliabl=true;
 }

  }
  chooseGroup(selectGroup){
    console.log("slected group is", selectGroup," user is ", this.user);
    this.chatcommService.joinGroup(this.user,selectGroup);
    this.selectedGroup=selectGroup;
  }
  sendMessage(){
    console.log("send btn works...");
    this.chatcommService.sendAnyMessage(this.user,this.msg,this.selectedGroup);
  }
  leave(){
    this.chatcommService.leaveGroup(this.user,this.selectedGroup);
    // this.selectedGroup="";
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
 