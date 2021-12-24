import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { AdmCategory } from '../category/AdmCategory';
import { UtilsService } from 'app/core/services/utils.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiService, private utilService: UtilsService,  private fuseProgresBar: FuseProgressBarService) {

  }

  getCategories(id,params?): Promise<any> {
    const url = `/rest/modules/v1/${id}/categories`;
    //this.fuseProgresBar.show();
    return new Promise((resolve, reject) => {
        this.api.getMethod(url, params).then(res => {
            let categories = res as AdmCategory[];
            this.fuseProgresBar.hide();
            resolve(categories);
        }).
        catch(error => {
            //this.fuseProgresBar.hide();
            this.utilService.openSnackBar('error al obtener listado de categorias')
            reject('error al obtener listado de categorias');
        });
    });
} 

}
