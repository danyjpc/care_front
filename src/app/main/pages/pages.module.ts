import { NgModule } from '@angular/core';
import {LoginModule} from './authentication/login/login.module';
import {ForgotPasswordModule} from './authentication/forgot-password/forgot-password.module';
import {ResetPasswordModule} from './authentication/reset-password/reset-password.module';
import { MailConfirmModule} from './authentication/mail-confirm/mail-confirm.module';
import { PublicSurveyComponent } from './public-survey/public-survey.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseSharedModule } from '@fuse/shared.module';
import { Error404Module } from './errors/404/error-404.module'

import { FormModule } from '../apps/form/form.module';

const routes = [
    {
        path : 'public/survey/:form_id/questions',
        component : PublicSurveyComponent
    } 
]

@NgModule({
    imports: [
        // Authentication
        RouterModule.forChild(routes),

        LoginModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        MailConfirmModule,
        Error404Module,
        FlexLayoutModule,
        FuseSharedModule,
        FormModule
    ],
    declarations: [PublicSurveyComponent]
})
export class PagesModule
{

}
