import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModule } from './users/users.module';
import { ModulescategoriesModule } from './modulescategories/modulescategories.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrganizationsModule } from './organizations/organizations.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared-module';

const routes =[
  {
    path : 'configuration',
    component : ConfigurationComponent, 
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UsersModule,
    ModulescategoriesModule,
    FuseSharedModule,
    OrganizationsModule,
    FlexLayoutModule,
    
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule
  ]
})
export class ManagmentModule { }
