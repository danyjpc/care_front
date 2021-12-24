import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './utils-components/alert-dialog/alert-dialog.component';
import { CanAccessDirective } from './directives/can-access.directive';
import { ShowForDirective } from './directives/show-for.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { FuseSharedModule } from '../../@fuse/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { GetGroupFormNamePipe } from './pipes/form-group-name-pipe';
import { ArrowBackComponent } from './utils-components/arrow-back/arrow-back.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InputDialogComponent } from './utils-components/input-dialog/input-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    ShowForDirective, 
    CanAccessDirective,
    AlertDialogComponent,

    GetGroupFormNamePipe,
    ArrowBackComponent,
    InputDialogComponent,
  ],

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    FuseSharedModule,
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule
   
  ],
  exports: [
    //CanAccessDirective,
    ShowForDirective,
    AlertDialogComponent,
    GetGroupFormNamePipe,
    ArrowBackComponent,
    InputDialogComponent
  ]
})
export class SharedModule{ }
