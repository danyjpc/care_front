import { AdmCreatedBy } from "../users/AdmUser";

export class AdmCategory {
    category_id:number =0;
    name_category: string;
    icon: string = 'assignment';
    color : string;
    created_by_user: AdmCreatedBy

    constructor() {
        this.created_by_user = new AdmCreatedBy();
    }
    
}


export class  AdmCategoryId {
    category_id:number;
    name_category: string;
}