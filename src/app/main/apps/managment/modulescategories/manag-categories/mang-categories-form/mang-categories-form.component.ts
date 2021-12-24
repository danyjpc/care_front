import { Component, OnInit, Inject } from '@angular/core';
import { AdmCategory } from '../../AdmModulesCategories';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-mang-categories-form',
  templateUrl: './mang-categories-form.component.html',
  styleUrls: ['./mang-categories-form.component.scss']
})
export class MangCategoriesFormComponent implements OnInit {

  category : AdmCategory;
  title : string;


  constructor(
    public dialogRef: MatDialogRef<MangCategoriesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) 
  {
    this.title  = (data && data.category) ? 'Actualizar' : 'Agregar';
    this.category = (data && data.category) ? data.category : new AdmCategory();
  }

  ngOnInit(): void {
  }

}
