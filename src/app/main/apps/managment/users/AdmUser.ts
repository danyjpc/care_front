import { timeStamp } from "console";
import { environment as env } from "../../../../../environments/environment";
import {TypologyId}  from '../../../../shared/adm-models/AdmTypology'


export class AdmUser {
    user_id: number = 0;
    password: string = '';
    organization: OrganizationId;
    person: Person;
    role: TypologyId;
    status: TypologyId;
    date_create : Date = new Date();
    constructor(){
        this.organization = new OrganizationId();
        this.organization.organization_id  = env.DEFAULT_ORGANIZATION

        this.person = new Person();
        this.role = new TypologyId();
        this.role.typology_id = env.DEFAULT_ROLE_AMINISTRATOR

        this.status = new TypologyId();
        this.status.typology_id = env.DEFAULT_STATUS_ACTIVE
    }
}



export class  OrganizationId {
    organization_id: number;
    name_organization: string;

}

export class Person {
    person_id: number;
    first_name: string;
    last_name: string;
    cui: number;
    birthday: string =  env.DEFAULT_DATE;
    email: string;
    state: TypologyId
    city: TypologyId
    
    constructor(){ 
        this.state = new TypologyId()
        this.state.typology_id = env.DEFAULT_DEPARTAMENTO_TYPOLOGY

        this.city = new TypologyId()
        this.city.typology_id =  env.DEFAULT_MUNICIPIO_TYPOLOGY
    }

}

export class AdmOrganization{
    organization_id: number;
    name_organization: string;
}


export class AdmGroupPermission{
    module_id : number = 0
    name_module : string = ""
    permissions : AdmUserPermission[] = []
}

export class  AdmUserPermission{
    permission_id : number = 0
    name_permission : string = ""
    alias : string = ""
    has_permissions : boolean = false
}

export class AdmChangePassword{
    user_id : number = 0
    old_pass : string = ""
    new_pass : string = ""
    confirm_pass : string = ""
}