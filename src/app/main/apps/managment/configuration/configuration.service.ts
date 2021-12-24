import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { UtilsService } from 'app/core/services/utils.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AdmConfiguration } from './AdmConfiguration'

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private api: ApiService, private utilService: UtilsService,  private fuseProgresBar: FuseProgressBarService) { }

  getConfig(params?): Promise<any>{
    const url =  `/rest/configs/v1`;
    this.fuseProgresBar.show();
    return new Promise((resolve, reject)=>{
      this.api.getMethod(url, params).then(res =>{
        this.fuseProgresBar.hide();
        const configs = res as AdmConfiguration [];
        resolve(configs);
      }).catch(error =>{
        this.fuseProgresBar.hide();
        this.utilService.openSnackBar('Error al obtener el listado de configuraciones')
        reject(error)
      })
    })
  }

  updateConfig(configs : AdmConfiguration[]): Promise<any>{
    this.fuseProgresBar.show();
    const url = `/rest/configs/v1`
    return new Promise((resolve, reject) => {
      
    this.api.putMethod(url, configs)
      .then(res => {
          this.fuseProgresBar.hide()
        resolve(res)
        this.utilService.openSnackBar('Se actualizaron correctamente las configuraciones')
      })
      .catch(error => {
          this.fuseProgresBar.hide()
        this.utilService.openSnackBar('Hubo un error al actualizar')
        reject(error)
      })
  })
  }
}
