import { AdmCreatedBy } from "../../users/AdmUser";
import { TypologyId } from "../../../../shared/adm-models/AdmTypology";
import { environment as env } from "../../../../../environments/environment";

export class AdmOrganization {
    organization_id : number =0;
    name_organization : string = '';
    abbreviation : string = '';
    url : string = '';

    created_by_user: AdmCreatedBy;
    status: TypologyId;
    date_created : '';

    constructor(){
        this.created_by_user = new AdmCreatedBy();
        this.status = new TypologyId();
        this.status.typology_id =  env.DEFAULT_STATUS_ACTIVE;
    }
}
