import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-project-module',
    templateUrl: 'dialog-project-module.html',
  })
  export class DialogProjectModule implements OnInit {
  
    constructor(public dialogRef: MatDialogRef<DialogProjectModule>) { }
  
    ngOnInit(): void {
    }
  
}