import { Component, OnInit } from '@angular/core';
import { AdmCategory } from 'app/main/apps/category/AdmCategory';
import { CategoryService } from 'app/main/apps/category/category.service';
import { AdmForm } from 'app/main/apps/form/AdmForm';
import { FormService } from 'app/main/apps/form/form.service';
import { AdmProjectModule } from 'app/main/apps/modules/AdmProjectModule';
import { ProjectModulesService } from 'app/main/apps/modules/project-modules.service';
import { AdmForms, FilterFormParams } from '../../AdmForms';
import { FormBuilderService } from '../../form-builder.service';

@Component({
  selector: 'app-forms-filter-sidebar',
  templateUrl: './forms-filter-sidebar.component.html',
  styleUrls: ['./forms-filter-sidebar.component.scss']
})
export class FormsFilterSidebarComponent implements OnInit {
  ProjectModules: AdmProjectModule[]=[];
  ProjectCategories: AdmCategory[]=[];
  FilterParams : FilterFormParams;
  constructor(
    private moduleService: ProjectModulesService,
    private categoriService: CategoryService,
    private formBuilderService: FormBuilderService
  )
  {
    this.FilterParams = new FilterFormParams();
  }

  ngOnInit(): void {
    this.loadModules();
  }

  async loadModules(){
    this.ProjectModules =  await this.moduleService.getModules();
  }

  async loadCategoriesByModule(module_id ){
    this.FilterParams.category = 0 ;
    this.ProjectCategories = await this.categoriService.getCategories(module_id)
  }

  async filterForms(){
    await this.formBuilderService.get_available_forms(this.FilterParams)
   
  }

  async showAllForms(){
    await this.formBuilderService.get_available_forms()
  }

}
