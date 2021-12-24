import { Component, OnInit, Inject } from '@angular/core';
import { AdmModule } from '../../AdmModulesCategories';
import { ModulescategoriesService } from '../../modulescategories.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mang-modules-form',
  templateUrl: './mang-modules-form.component.html',
  styleUrls: ['./mang-modules-form.component.scss']
})
export class MangModulesFormComponent implements OnInit {

  module : AdmModule;
  title : string;

  constructor(
    private modulecategoryService : ModulescategoriesService,
    public dialogRef: MatDialogRef<MangModulesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) 
  { 
    this.title  = (data && data.module) ? 'Actualizar' : 'Agregar';
    this.module = (data && data.module) ? data.module : new AdmModule();
  }

  ngOnInit(): void {
    this.getModules();
  }

  async getModules(){
    //this.modules = await this.modulecategoryService.getModules() as AdmModule[];
  }

}
