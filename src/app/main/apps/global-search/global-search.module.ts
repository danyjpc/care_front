import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { GlobalSearchWidgetComponent } from './global-search-widget/global-search-widget.component';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const routes =[
  {
    path: ':searchString',
    component: GlobalSearchComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [GlobalSearchComponent, GlobalSearchWidgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    FuseSharedModule,
    MatCardModule,
    MatIconModule
  ]
})
export class GlobalSearchModule { }
