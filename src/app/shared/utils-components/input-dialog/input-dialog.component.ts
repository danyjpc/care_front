import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent implements OnInit {
  email :'';
  inputNumber = false;
  phoneNumber :0;

  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  )
  {
    this.inputNumber = (data && data.inputNumber) ? true : false
  }

  ngOnInit(): void {
  }

  dimiss() {
    if(this.inputNumber){
      this.dialogRef.close(this.phoneNumber)
    }else{
      this.dialogRef.close(this.email);
    } 
  }

}
