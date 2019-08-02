import { Component, OnInit } from '@angular/core';
import { ChatcommServiceService } from 'src/app/shared/chatcomm-service.service';

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
  constructor(private chatcommService:ChatcommServiceService) { }

  ngOnInit() {
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
}
