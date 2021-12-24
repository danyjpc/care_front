import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { ModulesComponent } from './modules.component';

import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProjectModulesListComponentComponent } from './project-modules-list-component/project-modules-list-component.component';
import { ProjectModulesWidgetComponentComponent } from './project-modules-widget-component/project-modules-widget-component.component';
import { DialogProjectModule } from './project-modules-widget-component/dialog-project-module.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'app/shared/shared-module';




const routes = [
  {
      path     : 'module',
      component: ModulesComponent,
      canActivate: [AuthGuard]

  }
];


@NgModule({
  declarations: [
    ModulesComponent, 
    ProjectModulesListComponentComponent, 
    ProjectModulesWidgetComponentComponent,
    DialogProjectModule,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SharedModule 
  ],
  exports     : [
    ModulesComponent
  ]
})
export class ModulesModule { }