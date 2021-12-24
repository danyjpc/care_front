import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { UtilsService } from 'app/core/services/utils.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AdmOrganization } from '../organizations/AdmOrganization';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  OnListaORGsChange: BehaviorSubject<any>;
  constructor(
    private api: ApiService,
    private utilService: UtilsService,
    private fuseProgresBar: FuseProgressBarService
  ) {
    this.OnListaORGsChange = new BehaviorSubject([]);
  }

  getORGs(params?): Promise<any> {
    const url = `/rest/organizations`;
    this.fuseProgresBar.show();
    return new Promise((resolve, reject) => {
      this.api.getMethod(url, params).then(orgs => {
        this.fuseProgresBar.hide();
        const listOrgs = orgs as AdmOrganization[];
        this.OnListaORGsChange.next(listOrgs)
        resolve(listOrgs);
      }).
        catch(error => {
          this.fuseProgresBar.hide();
          this.utilService.openSnackBar('error al obtener listado de organizaciones')
          reject('error al obtener listado de organizaciones');
        });
    });
  }

  createORG(org: AdmOrganization): Promise<any> {
    const url = `/rest/organizations`
    return new Promise((resolve, reject) => {
      this.fuseProgresBar.show()
      this.api.postMethod(url, org)
        .then(response => {
          this.fuseProgresBar.hide()
          this.getORGs();
          resolve(true)
        })

        .catch(error => {
          this.fuseProgresBar.hide()
          this.utilService.openSnackBar('Error al crear nuevo registro de organizacion')
          reject(error);
        })
    })
  }

  updateORG(org: AdmOrganization): Promise<any> {
    const url = `/rest/organizations/${org.organization_id}`
    return new Promise((resolve, reject) => {
      this.fuseProgresBar.show()
      this.api.putMethod(url, org)
        .then(response => {
          this.fuseProgresBar.hide()
          this.getORGs();
          resolve(true)
        })

        .catch(error => {
          this.fuseProgresBar.hide()
          this.utilService.openSnackBar('Error al actualizar la organizacion')
          reject(error);
        })
    })
  }
}
