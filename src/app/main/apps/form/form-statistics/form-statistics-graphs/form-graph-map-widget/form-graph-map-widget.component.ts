import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';;
import { FormModelStats, QuestionStats } from '../../../form-stats-model';
import { FormService } from '../../../form.service';
import GTMAP from "@highcharts/map-collection/countries/gt/gt-all.geo.json";





@Component({
  selector: 'app-form-graph-map-widget',
  templateUrl: './form-graph-map-widget.component.html',
  styleUrls: ['./form-graph-map-widget.component.scss']
})

export class FormGraphMapWidgetComponent implements OnInit {
  
  @Input()questionStats: QuestionStats

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartOptions: Highcharts.Options;

  constructor(private formService: FormService) { 

    
  }

  ngOnInit(): void {
    this.loadChartData()

  }

  loadChartData() {
    const mapData = this.transformSeriesData(this.questionStats.stats)
    this.chartOptions = {
      chart: {
        map: GTMAP
      },
      title: {
        text: this.questionStats.question_name
      },
      subtitle: {
        text:
          this.questionStats.question_name
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: "spacingBox"
        }
      },
      legend: {
        enabled: true
      },
      colorAxis: {
        min: 0
      },
      series: [
        {
          type: "map",
          name: this.questionStats.question_name,
          states: {
            hover: {
              color: "#BADA55"
            }
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          },
          data: mapData as []
        }
      ]
    }
  }

  

  transformSeriesData(stats: Object) {  
    return Object.keys(stats).map( key => {
      const name = key;  
      const count = stats[key];
      return [name, count ]
    })
  }



}


