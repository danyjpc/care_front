import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { UtilsService } from 'app/core/services/utils.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AdmModule } from '../modulescategories/AdmModulesCategories';
import { AdmCategory } from '../modulescategories/AdmModulesCategories';


@Injectable({
  providedIn: 'root'
})
export class ModulescategoriesService {

  constructor(private api: ApiService, private utilService: UtilsService,
    private fuseProgresBar: FuseProgressBarService
  ) { }

  getModules(params?): Promise<any> {
    const url = `/rest/modules/v1`;
    this.fuseProgresBar.show();
    return new Promise((resolve, reject) => {
      this.api.getMethod(url, params).then(res => {
        this.fuseProgresBar.hide();
        let Modules = res as AdmModule[];
        resolve(Modules);
      }).
        catch(error => {
          this.fuseProgresBar.hide();
          this.utilService.openSnackBar('error al obtener listado de modulos')
          reject('error al obtener listado de modulos');
        });
    });
  }

  create_new_module(module: AdmModule): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fuseProgresBar.show();
      const url = `/rest/modules/v1`

      this.api.postMethod(url, module)
        .then(res => {
          this.fuseProgresBar.hide()
          resolve(res)
        })
        .catch(error => {
          this.fuseProgresBar.hide()
          this.utilService.openSnackBar('Hubo un error al crear el module')
          reject(error)
        })
    })
  }

  update_module(module: AdmModule): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fuseProgresBar.show();
      const url = `/rest/modules/v1/${module.module_id}`;

      this.api.putMethod(url, module)
        .then(res => {
          this.fuseProgresBar.hide()
          resolve(res)
        })
        .catch(error => {
          this.fuseProgresBar.hide()
          this.utilService.openSnackBar('Hubo un error al actualizar el modulo')
          reject(error)
        })
    })
  }

  getCategories(id,params?): Promise<any> {
    const url = `/rest/modules/v1/${id}/categories`;
    this.fuseProgresBar.show();
    return new Promise((resolve, reject) => {
        this.api.getMethod(url, params).then(res => {
            let categories = res as AdmCategory[];
            this.fuseProgresBar.hide();
            resolve(categories);
        }).
        catch(error => {
            this.fuseProgresBar.hide();
            this.utilService.openSnackBar('error al obtener listado de categorias')
            reject('error al obtener listado de categorias');
        });
    });
  }
  
  create_new_category(module_id,category: AdmCategory): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fuseProgresBar.show();
      const url = `/rest/modules/v1/${module_id}/category`

      this.api.postMethod(url, category)
        .then(res => {
          this.fuseProgresBar.hide()
          resolve(res)
        })
        .catch(error => {
          this.fuseProgresBar.hide()
          this.utilService.openSnackBar('Hubo un error al crear la categoria')
          reject(error)
        })
    })
  }

  update_category(module_id, category: AdmCategory): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fuseProgresBar.show();
      const url = `/rest/modules/v1/${module_id}/category/${category.category_id}`

      this.api.putMethod(url, category)
        .then(res => {
          this.fuseProgresBar.hide()
          resolve(res)
        })
        .catch(error => {
          this.fuseProgresBar.hide()
          this.utilService.openSnackBar('Hubo un error al actualizar la categoria')
          reject(error)
        })
    })
  }

}
