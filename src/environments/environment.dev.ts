import * as moment from 'moment';

export const environment = {
    production: false,
    hmr       : false,
    development: true,

    SERVER_URL: 'https://care-beta-api.mypeopleapps.com',
    OWNER_DEFAULT: 100,
    CLI_DEFAULT: 100,
    PARENT_DEFAULT: 100,
    NOW: moment(new Date()).format('YYYY-MM-DD HH:MM:ss'),
    ONLY_TIME: moment(new Date()).format('HH:MM:ss'),
    TODAY: moment(new Date()).format('YYYY-MM-DD'),
    DEFAULT_DATE: '1900-01-01 00:00:00',
    EMPTY_TYPOLOGY: 160000,
    COUNTRY_DEFAULT: 160059,
  
    ROLES_TYPOLOGY: 160522,
    STATUS_TYPOLOGY: 160444,
    DEFAULT_ROLE_AMINISTRATOR: 160523,
    DEFAULT_ROLE_OPERADOR: 160529, 
    DEFAULT_STATUS_ACTIVE: 160445,
    DEFAULT_STATUS_INACTIVE: 160447,
    DEFAULT_PHONE_CONTACT_TYPE: 160477,    
    DEFATULT_ADDRES_TYPE: 160477,


    DEFAULT_PAIS_TYPOLOGY: 160060, 
    DEFAULT_DEPARTAMENTO_TYPOLOGY: 160061,
    DEFAULT_MUNICIPIO_TYPOLOGY: 160083,
    DEFAULT_ZONA_TYPLOGY: 160422,

    DEFAULT_ORGANIZATION: 1,

};
