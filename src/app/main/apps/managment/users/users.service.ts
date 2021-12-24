import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {FuseProgressBarService} from '../../../../../@fuse/components/progress-bar/progress-bar.service';
import {ApiService} from '../../../../core/services/api.service';
import { AdmUser, AdmOrganization, AdmGroupPermission, AdmChangePassword } from './AdmUser';
import {UtilsService} from '../../../../core/services/utils.service';
import { AdmTypology }  from '../../../../shared/adm-models/AdmTypology'

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    OnListaUsersChange: BehaviorSubject<any>;
    OnUpdateUserChange: BehaviorSubject<any>;
    constructor(
        private fuseprogresbar: FuseProgressBarService,
        private utilsService: UtilsService,
        private api: ApiService,
    ){
        this.OnListaUsersChange = new BehaviorSubject([]);
        this.OnUpdateUserChange = new BehaviorSubject(new AdmUser());
    }


    get_users(params?): Promise<any>{
        const url = `/rest/users/v1`
        return new Promise((resolve, reject) => {
            this.fuseprogresbar.show()
            this.api.getMethod(url, params)
                .then(users =>  {
                    this.fuseprogresbar.hide()
                    const _users =  users as AdmUser[]
                    this.OnListaUsersChange.next(_users)
                    resolve (_users)

                })

                .catch(error => {
                    this.fuseprogresbar.hide()
                    this.utilsService.openSnackBar('Error al obtener listado de usuarios')
                    reject (error);
                })
        })
    }

    getUserById(user_id){
        const url = `/rest/users/v1/${user_id}`
        this.fuseprogresbar.show()
        return new Promise((resolve, reject) =>{
            this.api.getMethod(url)
            .then(user => {
                this.fuseprogresbar.hide()
                const _user = user as AdmUser
                this.OnUpdateUserChange.next(_user);
                resolve(_user)
            })
            .catch(error => {
                this.fuseprogresbar.hide()
                this.utilsService.openSnackBar('Error al obtener el usuario')
                reject (error);
            })
        })
    }


    create_user(user: AdmUser): Promise<any>{
        const url = `/rest/users/v1`
        return new Promise((resolve, reject) => {
            this.fuseprogresbar.show()
            this.api.postMethod(url, user)
                .then(response =>  {
                    this.fuseprogresbar.hide()
                    this.get_users();
                    resolve (true)

                })

                .catch(error => {
                    this.fuseprogresbar.hide()
                    this.utilsService.openSnackBar('Error al Crear Nuevo Usuario usuarios')
                    reject (error);
                })
        })
    }

    update_user(user: AdmUser): Promise<any>{
        const url = `/rest/users/v1/${user.user_id}`
        return new Promise((resolve, reject) => {
            this.fuseprogresbar.show()
            this.api.putMethod(url, user)
                .then(response =>  {
                    this.fuseprogresbar.hide()
                    this.get_users();
                    this.getUserById(user.user_id);
                    resolve (true)

                })

                .catch(error => {
                    this.fuseprogresbar.hide()
                    this.utilsService.openSnackBar('Error al Actualizar datos de usuarios')
                    reject (error);
                })
        })
    }

    changePassword(user : AdmChangePassword) : Promise<any>{
        const url = `/rest/users/v1/changepassword/${user.user_id}`
        return new Promise((resolve, reject) =>{
            this.fuseprogresbar.show()
            this.api.putMethod(url, user)
                .then(res =>{
                    this.fuseprogresbar.hide()
                    //this.getUserById(user.user_id)
                    this.utilsService.openSnackBar('Contraseña cambiada exitosamente.')
                    resolve(true)
                }).catch(error=>{
                    this.fuseprogresbar.hide()
                    //console.log(error.error.message)
                    this.utilsService.openSnackBar('Eror al actualizar la contraseña ,'+error.error.message+' intente de nuevo.')
                    //reject(error)
                })
        })
    }

    get_organizations(params?): Promise<any>{
        const url = `/rest/organizations`
        return new Promise((resolve, reject) => {
            this.fuseprogresbar.show()
            this.api.getMethod(url, params).then(organizations =>  {
                    this.fuseprogresbar.hide();
                    let orgs =  organizations as AdmOrganization[];
                    resolve (orgs);
                })
                .catch(error => {
                    this.fuseprogresbar.hide()
                    this.utilsService.openSnackBar('Error al obtener listado de organizaciones')
                    reject (error);
                })
        })
    }

    /** Metodos para obtener y assingar permisos al usuario */
    get_group_permissions(user_id): Promise<any>{
        const url = `/rest/users/v1/${user_id}/permissions`
        return new Promise((resolve, reject) =>{
            this.fuseprogresbar.show()
            this.api.getMethod(url).then(permissions => {
                this.fuseprogresbar.hide()
                let permission = permissions as AdmGroupPermission[];
                resolve (permission);
            })
            .catch(error =>{
                this.fuseprogresbar.hide()
                this.utilsService.openSnackBar('Error al obtener la lista de permisos del usuario')
                reject(error);
            })
        })
    }

    update_group_permission(user_id, gp: AdmGroupPermission[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fuseprogresbar.show();
          const url = `/rest/users/v1/${user_id}/permissions`
    
          this.api.putMethod(url, gp)
            .then(res => {
                this.fuseprogresbar.hide()
              resolve(res)
              this.utilsService.openSnackBar('Se asignaron los permisos correctamente')
            })
            .catch(error => {
                this.fuseprogresbar.hide()
              this.utilsService.openSnackBar('Hubo un error al actualizar los permisos')
              reject(error)
            })
        })
      }

}