import { AdmCreatedBy } from "../../users/AdmUser";
import { TypologyId } from "app/shared/adm-models/AdmTypology";
import { environment as env } from "environments/environment";

export class AdmModule {
    module_id:number =0;
    name_module: string = '';
    icon: string = 'file_copy';
    picture : string = 'http://via.placeholder.com/500';

    created_by_user: AdmCreatedBy;
    status: TypologyId;

    constructor(){
        this.created_by_user = new AdmCreatedBy();
        this.status = new TypologyId();
        this.status.typology_id =  env.DEFAULT_STATUS_ACTIVE;
    }
}

export class AdmCategory {
    category_id:number =0;
    name_category: string;
    icon: string ='assignment';
    color : string;

    created_by_user: AdmCreatedBy;
    status: TypologyId;

    constructor() {
        this.created_by_user = new AdmCreatedBy();
        this.status = new TypologyId();
        this.status.typology_id =  env.DEFAULT_STATUS_ACTIVE;
    }
    
}

