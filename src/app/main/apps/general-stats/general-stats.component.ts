import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { StatsService} from './stats-service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-general-stats',
  templateUrl: './general-stats.component.html',
  styleUrls: ['./general-stats.component.scss']
})
export class GeneralStatsComponent implements OnInit {
  showChart: boolean = false;
  stats: Object;
  $destroy: Subject<any>;

  constructor(
    private location: Location,
    private statsService: StatsService
  
  ) { 
    this.$destroy = new Subject();
  }

  async ngOnInit() {
    await this.statsService.getStats();
  
    this.statsService.OnStatsChange
      .pipe(takeUntil(this.$destroy))
      .subscribe(stats => {
        if (stats) {
          this.stats = stats;
          this.showChart = true;
        }
        else {
          this.showChart = false
        }
      })


    
  }

  backClicked(){
    this.location.back()
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next();
    this.$destroy.complete();
  }

}
