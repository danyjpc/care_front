import { Component, OnInit } from '@angular/core';
import { AdmProjectModule } from '../AdmProjectModule';
import { ProjectModulesService } from '../project-modules.service';
import { AdmGroupPermission, AdmUserPermission } from '../../managment/users/AdmUser';
import { UsersService } from '../../managment/users/users.service';

@Component({
  selector: 'app-project-modules-list-component',
  templateUrl: './project-modules-list-component.component.html',
  styleUrls: ['./project-modules-list-component.component.scss']
})
export class ProjectModulesListComponentComponent implements OnInit {

  projectModules: AdmProjectModule[]=[]
  user_id =0;
  ListGroupPermissions : AdmGroupPermission[] = [];
  ListPerm : AdmUserPermission[];

  constructor(
    private projectModuleService : ProjectModulesService,
    public userService : UsersService,
  ){
    this.loadPermission();
  }

  ngOnInit(): void {
    this.projectModuleService.getModules().then(
      data => {
        this.projectModules = data;
        //console.log(this.projectModules);
      }
    )
  }

  async loadPermission(){
    let userinfo = JSON.parse(sessionStorage.getItem("user"));
    this.user_id = parseInt(userinfo.user_id);
    //Obtiene los grupos de permissos del usuario 
    this.ListGroupPermissions = await this.userService.get_group_permissions(this.user_id) as AdmGroupPermission[];
  }


}
