import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralStatsComponent } from './general-stats.component';
import { AuthGuard } from '../../../../app/core/guards/auth.guard';
import { FuseSharedModule } from '@fuse/shared.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { GeneralMapWidgetComponent } from './general-map-widget/general-map-widget.component';
import { GeneralChartWidgetComponent } from './general-chart-widget/general-chart-widget.component';
import { FilterComponentComponent } from './filter-component/filter-component.component';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared-module';



const routes = [
  {
      path     : '',
      component: GeneralStatsComponent,
      canActivate: [AuthGuard]
  },
  {
    path     : 'filter/module/:module_id/state/:state_id/date/:date_ini/date2/:date_end',
    component: GeneralStatsComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  declarations: [GeneralStatsComponent, GeneralMapWidgetComponent, GeneralChartWidgetComponent, FilterComponentComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    HighchartsChartModule,
    RouterModule.forChild(routes),

    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    SharedModule

  ]
})
export class GeneralStatsModule { }
