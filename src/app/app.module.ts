import {NgModule, LOCALE_ID, APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { ModulesModule } from 'app/main/apps/modules/modules.module';
import { CategoryModule } from 'app/main/apps/category/category.module';

//extras

import {JwtModule} from '@auth0/angular-jwt';
import localeEs from '@angular/common/locales/es-GT';
import {LocationStrategy, PathLocationStrategy, registerLocaleData} from '@angular/common';
import {Interceptor} from './core/interceptor.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {ManagmentModule} from './main/apps/managment/managment.module';




//routes
registerLocaleData(localeEs, 'es');

// tslint:disable-next-line: typedef
export function tokenGetter() {
    try {
        const session = JSON.parse(sessionStorage.getItem('session'));
        return session !== null ? session['token'] : '';

    } catch (error) {
        return null;
    }

}

const appRoutes: Routes = [

    {
        path: 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule),
        
    },
    {
        path: 'profile',
        loadChildren: () => import('./main/apps/profile-page/profile-page.module').then(m => m.ProfilePageModule),
        
    },
    {
        path: 'form-builder',
        loadChildren: () => import('./main/apps/form-builder/form-builder.module').then(m => m.FormBuilderModule),
        
    },
    {
        path: 'management',
        loadChildren: () => import('./main/apps/managment/managment.module').then(m => m.ManagmentModule),
        
    },
    {
        path: 'search',
        loadChildren: () => import('./main/apps/global-search/global-search.module').then(m => m.GlobalSearchModule),
        
    },
    {
        path: 'stats',
        loadChildren: () => import('./main/apps/general-stats/general-stats.module').then(m => m.GeneralStatsModule),
        
    },
    /*{
        path      : '',
        redirectTo: 'sample',
        pathMatch: 'full',

    },*/
    {
        path      : '',
        redirectTo: 'module',
        pathMatch: 'full',

    },
    {
        path      : 'module/v1/:module_id/categories',
        redirectTo: 'category',
        pathMatch: 'full',

    },
    {
        path: 'survey',
        loadChildren: () => import('./main/apps/form/form.module').then(m => m.FormModule),
        
    },
    {
        path: 'managment',
        loadChildren: () => import('./main/apps/managment/managment.module').then(m => m.ManagmentModule),
        
    },

];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {useHash: true}),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        MatDividerModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule,
        ManagmentModule,
        ModulesModule,
        CategoryModule,

        //jwt
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter
            }
        })
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'es'},
        
        {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
        {
            provide: LOCALE_ID,
            useValue: 'es',
        },

        Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
    ]
})
export class AppModule
{
}
