import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrganizationsComponent } from './organizations.component';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'app/shared/shared-module';


const routes = [
  {
    path : 'organizations/list',
    component: OrganizationsComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [OrganizationsComponent, OrganizationsListComponent, OrganizationFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    SharedModule 
  ]
})
export class OrganizationsModule { }
