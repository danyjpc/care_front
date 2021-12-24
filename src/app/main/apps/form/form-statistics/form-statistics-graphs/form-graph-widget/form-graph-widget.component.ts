import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FormModelStats, QuestionStats } from '../../../form-stats-model';
import { FormService } from '../../../form.service';


@Component({
  selector: 'app-form-graph-widget',
  templateUrl: './form-graph-widget.component.html',
  styleUrls: ['./form-graph-widget.component.scss']
})
export class FormGraphWidgetComponent implements OnInit {

  @Input() questionStats: QuestionStats
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(private formService: FormService) { 

    
  }

  ngOnInit(): void {
    this.loadChartData()
    // this.chartOptions =  {
    //   title: {
    //     text: 'question_type'
    //   },
    //   series: [
    //     {
    //       type: "pie",
    //       data: [{
    //         name: 'Chrome',
    //         y: 61.41,
    //       }, {
    //         name: 'Internet Explorer',
    //         y: 11.84
    //       }, {
    //         name: 'Firefox',
    //         y: 10.85
    //       }, {
    //         name: 'Edge',
    //         y: 4.67
    //       }, {
    //         name: 'Safari',
    //         y: 4.18
    //       }, {
    //         name: 'Sogou Explorer',
    //         y: 1.64
    //       }, {
    //         name: 'Opera',
    //         y: 1.6
    //       }, {
    //         name: 'QQ',
    //         y: 1.2
    //       }, {
    //         name: 'Other',
    //         y: 2.61
    //       }]
    //     }
    //   ]
    // };
  }

  loadChartData() {
    this.chartOptions =  this.formService.transformDataToHigcharOptions(this.questionStats)
  }

}
