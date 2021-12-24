import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder.component';
import { RouterModule } from '@angular/router';
import { BuilderComponentComponent } from './builder-component/builder-component.component';
import {MatExpansionModule} from '@angular/material/expansion'; 
import { FuseSharedModule } from '@fuse/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {SharedModule} from '../../../shared/shared-module';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { BuilderV2Component } from './builder-v2/builder-v2.component';
import { FormGroupsComponent } from './builder-v2/form-groups/form-groups.component';
import { QuestionsComponent } from './builder-v2/questions/questions.component';
import { GroupEditCreateComponent } from './builder-v2/group-edit-create/group-edit-create.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { ManagementFormsComponent } from './management-forms/management-forms.component';
import { FormsListComponent } from './management-forms/forms-list/forms-list.component';
import { FormsCreateEditComponent } from './management-forms/forms-create-edit/forms-create-edit.component';
import { SingleViewFormWidgetComponent } from './management-forms/single-view-form-widget/single-view-form-widget.component';
import { MatCardModule } from '@angular/material/card';
import { FormsFilterSidebarComponent } from './management-forms/forms-filter-sidebar/forms-filter-sidebar.component';
import { FormGroupsListComponent } from './builder-v2/form-groups-list/form-groups-list.component';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardModule } from 'ngx-clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes = [
  {
      path     : '',
      component: ManagementFormsComponent,
      canActivate: [AuthGuard]
  },
  {
    path     : 'v2/:form_id',
    component: BuilderV2Component,
    canActivate: [AuthGuard]
  }

];



@NgModule({
  declarations: [FormBuilderComponent, BuilderComponentComponent, BuilderV2Component, FormGroupsComponent, QuestionsComponent, GroupEditCreateComponent, ManagementFormsComponent, FormsListComponent, FormsCreateEditComponent, SingleViewFormWidgetComponent, FormsFilterSidebarComponent, FormGroupsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    FuseSharedModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,

    SharedModule,
    MatDialogModule,
    MatCardModule,
    MatSlideToggleModule,  
    ClipboardModule,
    DragDropModule
  ]
})
export class FormBuilderModule { }
