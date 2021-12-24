import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailConfirmComponent } from './mail-confirm.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule } from '@angular/material/icon';

const routes = [
  {
      path     : 'auth/mail-confirm',
      component: MailConfirmComponent
  }
];

@NgModule({
  declarations: [MailConfirmComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    FuseSharedModule
  ]
})
export class MailConfirmModule { }
