import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/services/api.service';
import { UtilsService } from 'app/core/services/utils.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AdmGlobalSearch } from '../global-search/AdmGlobalSearch';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {

  constructor(private api: ApiService, private utilService: UtilsService,
    private fuseProgresBar: FuseProgressBarService) { }

  getSearch(params?): Promise<any>{
    const url = `/rest/search/v1/`
    this.fuseProgresBar.show();
    return new Promise((resolve, reject)=>{
      this.api.getMethod(url, params).then(res =>{
        this.fuseProgresBar.hide()
        let records  = res as AdmGlobalSearch
        resolve(records)
      })
      .catch(error =>{
        this.fuseProgresBar.hide();
        this.utilService.openSnackBar('Error al obtener el resultado de la busqueda')
        reject('Error al obtener el resultado de la busqueda')
      })
    })
  }
}
