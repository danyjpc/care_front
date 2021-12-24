import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  title: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  
  ) { 
    this.title = (data && data.confirm) ?  true : false
    //this.title = "¿Está seguro de eliminar este registro?"
  }

  ngOnInit(): void {
  }


  dimiss(option: boolean) {
    this.dialogRef.close(option);
  }


}
