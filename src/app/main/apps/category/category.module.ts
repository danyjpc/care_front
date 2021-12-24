import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryWidgetComponent } from './category-widget/category-widget.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from 'app/core/guards/auth.guard';

const routes = [
  {
      path     : 'module/v1/:module_id/categories',
      component: CategoryComponent,
      canActivate: [AuthGuard]

  }
];

@NgModule({
  declarations: [CategoryComponent, CategoryListComponent, CategoryWidgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    FuseSharedModule
  ]
})
export class CategoryModule { }
