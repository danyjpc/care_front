import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '../../../../../../@fuse/services/config.service';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import {AutenticationService} from '../../autentication-service';
import { ConfigurationService } from '../../../../apps/managment/configuration/configuration.service';
import { AdmConfiguration } from '../../../../apps/managment/configuration/AdmConfiguration';

@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit
{
    loginForm: FormGroup;
    type = 'password';
    admConfigs : AdmConfiguration [] = [];
    image_background :"";

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
     constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private autenticationService: AutenticationService,
        private configService: ConfigurationService
    )
    {
        this.getConfigs();
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    login() {
        const data =  this.loginForm.getRawValue();
        this.autenticationService.login(data);
    }

    showInput(type?: string){
        
        switch (type) {
            case 'text':
                this.type = 'text'
                break;
            case 'pass':
                this.type = 'password'
                break;
            default:
                break;
        }
    }

    async getConfigs(){
        this.admConfigs = await this.configService.getConfig() as AdmConfiguration [];
        this.image_background = this.admConfigs[0].config_value;
        //console.log(this.image_background)
    }
}
