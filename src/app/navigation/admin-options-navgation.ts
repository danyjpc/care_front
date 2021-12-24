export const  AdminOptions: adminOptions[]  = [
    {
        icon: 'people',
        title: 'Administrar Accesos',
        path: '/management/users/list'
    },
    {
        icon: 'post_add',
        title: 'Administrar Boletas/Encuestas',
        path: '/form-builder'
    },
    {
        icon: 'category',
        title: 'Administrar Módulos - Categorías',
        path: '/modules-categories'
    },
    {
        icon: 'business',
        title: 'Administrar Organizaciones',
        path: '/organizations/list'
    },
    {
        icon: 'tune',
        title: 'Configuraciones',
        path: '/managment/configuration'
    }
]




export interface adminOptions {
    icon: string;
    title: string;
    path: string
}