import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { ModulescategoriesComponent } from './modulescategories.component';
import { MangModulesListComponent } from './manag-modules/mang-modules-list/mang-modules-list.component';
import { MangModulesFormComponent } from './manag-modules/mang-modules-form/mang-modules-form.component';
import { MangCategoriesListComponent } from './manag-categories/mang-categories-list/mang-categories-list.component';
import { MangCategoriesFormComponent } from './manag-categories/mang-categories-form/mang-categories-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { SharedModule } from 'app/shared/shared-module';

const routes = [
  {
      path     : 'modules-categories',
      component: ModulescategoriesComponent,
      canActivate: [AuthGuard]
  },
  {
    path     : 'modules-categories/module/:module_id',
    component: ModulescategoriesComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    ModulescategoriesComponent, 
    MangModulesListComponent, 
    MangModulesFormComponent, 
    MangCategoriesListComponent, 
    MangCategoriesFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    FlexLayoutModule,

    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    SharedModule
      
  ]
})
export class ModulescategoriesModule { }
