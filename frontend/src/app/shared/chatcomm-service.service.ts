import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatcommServiceService {
private socket = io("http://localhost:3000");
  constructor() { }
  ngOnInit(){

  } 
  joinGroup(user,group){
    console.log("joinGroup fun", group);
    this.socket.emit('new_joinee',{
      name:user,
      group:group
    })
  }

  //other person listing to new joining
  joinNewGroup(){
    let observable= new Observable((observe)=>{
      this.socket.on('new user join',(data)=>{
          observe.next(data);
      });
      return()=>{this.socket.disconnect();}
    });
    return observable;
  }

//leave group
leaveGroup(user,group){
  // this.socket.emit('leave group',data);
  console.log("group leave", group);
  this.socket.emit('leave group',{
    name:user,
    group:group
  });
}
//other person listing user left group
userLeftGroup(){
  let observable= new Observable((observe)=>{
    this.socket.on('left group',(data)=>{
        observe.next(data);
    });
    return()=>{this.socket.disconnect();}
  });
  return observable;
}

  //send any msg or start chat
  sendAnyMessage(user,msg,group){
    this.socket.emit('chatting',{
      name:user,
      msg:msg,
      group:group
    });
  }
  
//start user chat on server new message
startChat(){
  return new Observable((observe)=>{
    this.socket.on('typing',(data)=>{
      observe.next(data);
    });
    this.socket.on('newMessage',(data)=>{
      console.log("start chatting ",data.user);
        observe.next(data);
    });
  });
}
} 
