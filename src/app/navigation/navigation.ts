import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'home',
        title    : 'Inicio',
        type     : 'item',
        icon     : 'home',
        url      : '/home',
    },
    {
        id      : 'administrar',
        title   : 'Administrar',
        type    : 'collapsable',
        icon    : 'settings_applications',
        children: [
            {
                id   : 'usuarios',
                title: 'Usuarios',
                type : 'item',
                icon : 'people',
                url  : 'administrar/users'
            }
        ]
    },
    {
        id       : 'logout',
        title    : 'Salir del Sistema',
        type     : 'item',
        icon     : 'exit_to_app',
        url      : '/pages/auth/login',
        function : ( () => sessionStorage.clear())
    }, 
];
