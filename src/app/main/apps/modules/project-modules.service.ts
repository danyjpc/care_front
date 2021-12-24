import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { AdmProjectModule } from '../modules/AdmProjectModule';
import { UtilsService } from 'app/core/services/utils.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Injectable({providedIn: 'root'})

export class ProjectModulesService{

    constructor( private api: ApiService, private utilService: UtilsService,  private fuseProgresBar: FuseProgressBarService){
    }

    getModules(params?): Promise<any> {
        const url = `/rest/modules/v1`;
        this.fuseProgresBar.show();
        return new Promise((resolve, reject) => {
            this.api.getMethod(url, params).then(res => {
                this.fuseProgresBar.hide();
                let projectModules = res as AdmProjectModule[];
                
                resolve(projectModules);
            }).
            catch(error => {
                this.fuseProgresBar.hide();
                this.utilService.openSnackBar('error al obtener listado de modulos')
                reject('error al obtener listado de modulos');
            });
        });
    } 

}