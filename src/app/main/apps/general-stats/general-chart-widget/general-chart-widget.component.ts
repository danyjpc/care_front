import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormService } from '../../form/form.service';
import { StatsService } from '../stats-service';

@Component({
  selector: 'app-general-chart-widget',
  templateUrl: './general-chart-widget.component.html',
  styleUrls: ['./general-chart-widget.component.scss']
})
export class GeneralChartWidgetComponent implements OnInit {

  @Input() stats;
  @Input() label = 'Contador General'
  @Input() chartType: 'bar' | 'column' | 'pie' | 'area'

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  $destroy: Subject<any>;

  constructor(
    private formService: FormService, 
    private statsService: StatsService ) { 

      this.$destroy = new Subject();

  }

  ngOnInit(): void {  

    this.statsService.OnStatsChange
      .pipe(takeUntil(this.$destroy))
      .subscribe(responseStats=> {
        if (responseStats[this.stats]) {
          this.loadChartData(responseStats[this.stats] )
        }
      })

    
  }


  loadChartData(stats) {
    this.chartOptions = 
    {
        title: {text: this.label},
        xAxis: {
            categories: this.get_chart_axis_categories(stats)
        },
        series: [
            {
                name: this.label,
                type: this.chartType,
                data: this.formService.get_series_chart(stats)
            }
        ]
    };

    

  }

  get_chart_axis_categories(stats: Object){
    return Object.keys(stats).map( key => {
        const name = key;  
        return name
      })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next()
    this.$destroy.complete()
  }
}
