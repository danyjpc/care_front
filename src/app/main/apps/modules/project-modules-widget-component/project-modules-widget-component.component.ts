import { Component, Input, OnInit } from '@angular/core';
import { AdmProjectModule } from '../AdmProjectModule'
import { Router } from '@angular/router';
import { AdmGroupPermission, AdmUserPermission } from '../../managment/users/AdmUser';
import { MatDialog } from '@angular/material/dialog';
import { DialogProjectModule } from './dialog-project-module.component'


@Component({
  selector: 'app-project-modules-widget-component',
  templateUrl: './project-modules-widget-component.component.html',
  styleUrls: ['./project-modules-widget-component.component.scss']
})
export class ProjectModulesWidgetComponentComponent implements OnInit {

  @Input() projectModule: AdmProjectModule;
  @Input() ListGroupPermisos: AdmGroupPermission[] = [];
  @Input() user_id: number;
  ListPerm: AdmUserPermission[] = [];

  constructor(private router: Router, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getPermisoxModule(this.projectModule.module_id);
  }


  getPermisoxModule(module_id) {
    this.ListPerm = this.ListGroupPermisos.filter(elemento => elemento.module_id === module_id)[0].permissions
    //this.ListPerm =  moduleSelected[0].permissions

  }

  redirect(value) {
    //Si es el usuario 1 solo lo redirecciona de lo contrario se comprueba que tenga alguno de los permisos
    if (this.user_id == 1) {
      this.router.navigate(['module/v1', value.module_id, 'categories']);
    } else {
      const listHasPermission = this.ListPerm.some(permiso => permiso.has_permissions);
      if (listHasPermission) {
        this.router.navigate(['module/v1', value.module_id, 'categories']);
      } else {
        this.OpenDialog();
      }
    }
  }

  OpenDialog() {
    const dialogRef = this.dialog.open(DialogProjectModule, {

      data: {
      }
    })
  }
}

