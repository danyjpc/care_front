import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component }from './error-404.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path : 'error/404',
    component : Error404Component
  }
]

@NgModule({
  declarations: [Error404Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    FuseSharedModule,
    MatIconModule
  ],
  exports :[
    Error404Component
  ]
})
export class Error404Module { }
