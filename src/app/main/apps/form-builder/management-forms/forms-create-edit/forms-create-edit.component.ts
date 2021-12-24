import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmCategory } from 'app/main/apps/category/AdmCategory';
import { CategoryService } from 'app/main/apps/category/category.service';
import { AdmProjectModule } from 'app/main/apps/modules/AdmProjectModule';
import { ProjectModulesService } from 'app/main/apps/modules/project-modules.service';
import { AdmForms } from '../../AdmForms';
import { FormBuilderService } from '../../form-builder.service';

@Component({
  selector: 'app-forms-create-edit',
  templateUrl: './forms-create-edit.component.html',
  styleUrls: ['./forms-create-edit.component.scss']
})
export class FormsCreateEditComponent implements OnInit {

  formulario: AdmForms;
  title: string; 

  projectModules: AdmProjectModule[] = [];
  moduleCategories: AdmCategory[] = [];
  defaultModule : number;


  constructor(
    public dialogRef: MatDialogRef<FormsCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formService: FormBuilderService,
    private moduleService: ProjectModulesService,
    private categoriesServicoe: CategoryService
  )
  { 
    this.title =  (data && data.formulario) ? 'Editar' : 'Agregar';
    this.formulario = (data && data.formulario) ? data.formulario  : new AdmForms();
    this.defaultModule = (data && data.formulario) ? data.formulario.module.module_id:  1;
  }

  ngOnInit(): void {
    this.loadModules();

    if (this.title === 'Editar') {
      this.loadCategories(this.formulario.module.module_id);
    }
  }

  async loadModules(){
    this.projectModules =  await this.moduleService.getModules() as AdmProjectModule[]
  }

  async loadCategories(module_id){
    this.moduleCategories =  await this.categoriesServicoe.getCategories(module_id) as AdmCategory[]
  }

}
