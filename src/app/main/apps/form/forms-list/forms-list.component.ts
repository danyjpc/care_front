import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { AdmForm } from '../AdmForm';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UtilsService } from 'app/core/services/utils.service';

import { AdmGroupPermission, AdmUserPermission } from '../../managment/users/AdmUser';
import { UsersService } from '../../managment/users/users.service';
import { AdmForms } from '../../form-builder/AdmForms';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss']
})
export class FormsListComponent implements OnInit {

  forms : AdmForm []=[];
  displayedColumns: string[] = [ 'id', 'nombre', 'opciones'];
  module_id = 0;
  category_id = 0;
  user_id =0;
  ListPermissions : AdmGroupPermission[];
  ListPerm : AdmUserPermission[];
  

  constructor(
    private formService : FormService,
    private route: ActivatedRoute, private router: Router,
    public userService : UsersService,
    private utilService: UtilsService,
  )
  { 
    this.module_id = this.route.snapshot.params.module_id;
    this.category_id = this.route.snapshot.params.category_id;
    this.loadPermission();
  }

  ngOnInit(): void {
    this.ListaForms(this.module_id, this.category_id)
  }

  ListaForms(module, category){
    const params = { module, category}
    
    this.formService.getForms(params).then(data => {
        this.forms = data;
       // console.log(this.forms)
    
    })
  }

  async loadPermission(){
    let userinfo = JSON.parse(sessionStorage.getItem("user"));
    this.user_id = parseInt(userinfo.user_id);
    //Obtiene los permissos del usuario 
    this.ListPermissions = await this.userService.get_group_permissions(this.user_id) as AdmGroupPermission[];

    this.ListPermissions.forEach(e => {
      if(e.module_id ==this.module_id){
        this.ListPerm = e.permissions;
      }
    });
    //console.log(this.ListPerm);
  }

  fill_survey(form){
    if(this.ListPerm[0].has_permissions == true){
      this.router.navigate(['survey/v1',form.form_id,'questions','true']);
    }else{
      this.utilService.openSnackBar('No tienes acceso a esta opción')
    }
  }

  download_csv(form: AdmForms){
    if(this.ListPerm[1].has_permissions ==true){
      this.formService.downloadCSV(form)

    }else{
      this.utilService.openSnackBar('No tienes acceso a esta opción')
    }
  }

  view_stats(form){
    if(this.ListPerm[2].has_permissions == true){
      this.router.navigate(['survey/v1',form.form_id,'graphs',]);
    }else{
      this.utilService.openSnackBar('No tienes acceso a esta opción')
    }
  }

  view_answer(form){
    this.router.navigate(['survey/v1',form.form_id,'answers'])

  }

}
