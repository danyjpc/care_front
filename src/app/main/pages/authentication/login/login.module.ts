import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from 'app/main/pages/authentication/login/login-1/login.component';
import {Login2Component} from './login-2/login-2.component'

const routes = [
    {
        path     : 'auth/login-v1',
        component: LoginComponent
    },
    {
        path     : 'auth/login',
        component: Login2Component
    }
];

@NgModule({
    declarations: [
        LoginComponent,
        Login2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,

        FuseSharedModule
    ]
})
export class LoginModule
{
}
