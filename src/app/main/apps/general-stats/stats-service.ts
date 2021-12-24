import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { UtilsService } from '../../../../app/core/services/utils.service';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatsService {

OnStatsChange: BehaviorSubject<any>;

constructor(
  private api: ApiService, 
  private utilService: UtilsService,  
  private fuseProgresBar: FuseProgressBarService
)
{ 
  this.OnStatsChange = new BehaviorSubject([]);

}

  getStats(params?): Promise<any> {

    
    this.fuseProgresBar.show();
    const url = '/rest/stats/v1/general'

    return new Promise((resolve, reject) => {
      this.api.getMethod(url, params)
        .then(response => {
          this.fuseProgresBar.hide()
          this.OnStatsChange.next(response)
          resolve(response)
        })
        .catch(error => {
          this.fuseProgresBar.hide()
          this.utilService.openSnackBar('error al obtener estadisticas, intente de nuevo')
          reject (error)
        })
    })

  }
}