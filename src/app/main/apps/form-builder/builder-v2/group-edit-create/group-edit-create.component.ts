import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GryposByForm } from '../../AdmForms';

@Component({
  selector: 'app-group-edit-create',
  templateUrl: './group-edit-create.component.html',
  styleUrls: ['./group-edit-create.component.scss']
})
export class GroupEditCreateComponent implements OnInit {

  tittle: string;
  group: GryposByForm
  constructor(
    public dialogRef: MatDialogRef<GroupEditCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data

  ) 
  {
    this.tittle = (this.data && this.data.group) ? 'Editar'  :  'Agregar';
    this.group = (this.data && this.data.group) ?  this.data.group : new GryposByForm()
  }

  ngOnInit(): void {

  }

  close(){
    this.dialogRef.close();
  }
}
