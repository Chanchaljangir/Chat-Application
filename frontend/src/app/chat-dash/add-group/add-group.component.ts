import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }
  groupSave(){
    this.dialogRef.close("data saved");
    }
  close(){
    this.dialogRef.close("closed");
  }
}
