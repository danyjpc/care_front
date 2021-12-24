import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AutenticationService } from '../autentication-service'; 
import { ConfigurationService } from '../../../apps/managment/configuration/configuration.service';
import { AdmConfiguration } from '../../../apps/managment/configuration/AdmConfiguration';

@Component({
    selector     : 'forgot-password',
    templateUrl  : './forgot-password.component.html',
    styleUrls    : ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;
    admConfigs : AdmConfiguration [] = [];

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
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    resetPass(){
        const form = this.forgotPasswordForm.getRawValue();
        const email = form.email
        const params = { email }
        this.autenticationService.resetPassword(params);
    }
    async getConfigs(){
        this.admConfigs = await this.configService.getConfig() as AdmConfiguration [];
    }
}
