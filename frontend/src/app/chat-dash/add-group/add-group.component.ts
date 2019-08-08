import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ChatServiceService } from 'src/app/shared/services/chat/chat-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  addGroupForm:FormGroup; 
  constructor(public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private chatService: ChatServiceService,private toastr:ToastrService) { }
 
  ngOnInit() {
    this.addGroupForm = new FormGroup({
      'groupName' : new FormControl(null, Validators.required),  
  }); 
}  

  close(){
    this.dialogRef.close("closed");
  }
addGroup(){
  this.chatService.addGroup(this.addGroupForm.value).subscribe(data=>{
    if(data.success){
        console.log("new group is ", data);
        this.toastr.success(' Group Added');    
  }
  else{ 
    // console.log(data);
    this.toastr.error(' Group not Added');
    
  } 
});
}

}
