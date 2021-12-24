import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import {MatInputModule} from '@angular/material/input'; 
import {MatIconModule} from '@angular/material/icon'; 
import {UsersComponent} from './users.component'
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { FormModule } from '../../form/form.module';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared-module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { MatDatepickerModule } from '@angular/material/datepicker';
//import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { UserPermissionComponent } from './user-permission/user-permission.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';



const routes = [
  {
    path: 'users/list',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/permission/:user_id',
    component: UserPermissionComponent,
    canActivate: [AuthGuard]
  }

]

@NgModule({
  declarations: [UserListComponent, UserFormComponent, UsersComponent, UserPermissionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatIconModule,
    FuseSharedModule,
    MatButtonModule,
    MatIconModule,
    FormModule,
    MatSelectModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    //MatNativeDateModule,
    MatFormFieldModule,
    MatDialogModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatMomentDateModule    


  ],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true, strict: true}}
  ]
})
export class UsersModule { }
