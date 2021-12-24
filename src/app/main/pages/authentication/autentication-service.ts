import { Injectable } from '@angular/core';
import { FuseSplashScreenService } from '../../../../@fuse/services/splash-screen.service';
import { ApiService } from '../../../../app/core/services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AutenticationService {

    constructor(
        private _fuseSplashScreenService: FuseSplashScreenService,
        private api: ApiService,
        private router: Router,
        private _snackBar: MatSnackBar,
    )

    {

    }

    login(data){
        this._fuseSplashScreenService.show();
        this.api.loginMethod(data).then(res => {
            const session = {
                expire: res['expire'],
                token:  res['token'].split(' ').pop(),
                usuario_id:   res['usuario_id']
            };

            sessionStorage.setItem('session', JSON.stringify(session));
            this._fuseSplashScreenService.hide();
            
            this.router.navigate(['module']);
        }).catch(error => {
            this._fuseSplashScreenService.hide();
            if (error.status === 400) {
                // console.log(error.error);
                // this.utils.errorNotification('El nombre de usuario o contraseña son invalidos, intentelo de nuevo!');
                this._snackBar.open('Opps, el servidor respondió ' +  error.error.message,  'ok', {
                    duration: 2000,
                });
            } else {
                // this.utils.errorNotification('Ocurrio un error inesperado, intenta de nuevo!');
                this._snackBar.open('Ocurrio un error inesperado, intenta de nuevo!, verifique comunicación con el servidor', 'ok', {
                    duration: 2000,
                });
            }

        });
    }


    resetPassword(params?){
        this._fuseSplashScreenService.show();
        const url = `/rest/auth/forgot-password`
        this.api.resetPass(url,params).then(res =>{
            this._fuseSplashScreenService.hide();
            this.router.navigate(['/pages/auth/mail-confirm']);
        }).catch(error =>{
            this._fuseSplashScreenService.hide()
            if (error.error.code === "404") {
                //console.log(error)
                this._snackBar.open('Opps, el servidor respondió ' +  error.error.msg,  'ok', {
                    duration: 4000,
                });
            } else {
                this._snackBar.open('Ocurrio un error inesperado, intenta de nuevo!', 'ok', {
                    duration: 3500,
                });
            }
        })
    }

}