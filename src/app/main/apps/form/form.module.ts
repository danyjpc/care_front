import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsListComponent } from './forms-list/forms-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ShowFormComponent } from './show-form/show-form.component';
import { QuestionGroupComponent } from './show-form/question-group/question-group.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormStatisticsComponent } from './form-statistics/form-statistics.component';
import { FormStatisticsListComponent } from './form-statistics/form-statistics-list/form-statistics-list.component';
import { FormStatisticsGraphsComponent } from './form-statistics/form-statistics-graphs/form-statistics-graphs.component';
import { FormGraphWidgetComponent } from './form-statistics/form-statistics-graphs/form-graph-widget/form-graph-widget.component'; 
import { HighchartsChartModule } from 'highcharts-angular';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { FormGraphMapWidgetComponent } from './form-statistics/form-statistics-graphs/form-graph-map-widget/form-graph-map-widget.component';
import { FormStatisticsAnswersComponent } from './form-statistics/form-statistics-answers/form-statistics-answers.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormStatisticsAnswersListComponent } from './form-statistics/form-statistics-answers/form-statistics-answers-list/form-statistics-answers-list.component';
import { SharedModule } from 'app/shared/shared-module';


const routes = [
  {
      path     : 'module/:module_id/category/:category_id',
      component: FormComponent,
      canActivate: [AuthGuard]
  },
  {
    path     : 'v1/:form_id/questions/:show',
    component: ShowFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'v1/:form_id/graphs',
    component: FormStatisticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'v1/:form_id/answers',
    component : FormStatisticsAnswersComponent,
    canActivate : [AuthGuard]
  },
];

@NgModule({
  declarations: [FormComponent, 
    FormsListComponent, 
    ShowFormComponent, 
    QuestionGroupComponent, 
    FormStatisticsComponent, 
    FormStatisticsListComponent,
    FormStatisticsGraphsComponent,
    FormGraphWidgetComponent, 
    FormGraphMapWidgetComponent, 
    FormStatisticsAnswersComponent,
    FormStatisticsAnswersListComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    FuseSharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    HighchartsChartModule,
    MatPaginatorModule,
    SharedModule
  ],
  exports :[
    QuestionGroupComponent
  ]
})
export class FormModule { }
