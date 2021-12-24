import { Component, Input, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts/highmaps';;
import GTMAP from "@highcharts/map-collection/countries/gt/gt-all.geo.json";
import { Subject } from 'rxjs';
import { StatsService } from '../stats-service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-general-map-widget',
  templateUrl: './general-map-widget.component.html',
  styleUrls: ['./general-map-widget.component.scss']
})
export class GeneralMapWidgetComponent implements OnInit {
  
  
  $destroy: Subject<any>;

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartOptions: Highcharts.Options;
  UpdateChart = false;

  constructor( private statsService: StatsService) { 
    this.$destroy = new Subject()
  }

  ngOnInit(): void {
    
    this.statsService.OnStatsChange
      .pipe(takeUntil(this.$destroy))
      .subscribe((stats) => {
         if(stats['states']){
           this.loadChartData(stats['states']);
         }
      })

    //this.loadChartData()

  }

  loadChartData(stats) {
    const mapData = this.transformSeriesData(stats)
    this.chartOptions = {
      chart: {
        map: GTMAP
      },
      title: {
        text: 'Distribución de boletas por departamento'
      },
      subtitle: {
        text: 'Distribución de boletas por departamento'
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


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next();
    this.$destroy.complete();
  }

}
