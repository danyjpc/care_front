import { TypologyId } from "app/shared/adm-models/AdmTypology";
import { AdmCreatedBy } from "../users/AdmUser";
import { environment as env } from "environments/environment";
import { AdmCategory, AdmCategoryId } from "../category/AdmCategory";
import { AdmProjectModule, AdmProjectModuleId } from "../modules/AdmProjectModule";

export class GryposByForm { 
    group_id:  number =0;
    name_group: string;
    status: TypologyId;
    created_by_user: AdmCreatedBy

    constructor(){
        this.status = new TypologyId();
        this.status.typology_id = env.DEFAULT_STATUS_ACTIVE

        this.created_by_user = new AdmCreatedBy();
    }
}

export class AdmForms {
    form_id: number =0;
    name_form: string = '';
    is_public: boolean = false;
    module: AdmProjectModuleId;
    category: AdmCategoryId;
    created_by_user: AdmCreatedBy;
    date_created: string =  env.NOW
    status: TypologyId;

    constructor(){
        this.module = new AdmProjectModuleId();
        this.category = new AdmCategoryId();
        this.created_by_user = new AdmCreatedBy();
        this.status = new TypologyId();
        this.status.typology_id =  env.DEFAULT_STATUS_ACTIVE;
    }
}

export class Questions {
    question_id: number = 0;
    name_question: string;
    type: string;
    use_custom_option: boolean;
    use_for_counter: boolean;
    typology_id: number = env.EMPTY_TYPOLOGY;
    status: TypologyId;
    created_by_user: AdmCreatedBy;
    options: QuestionOptions[]=[];
    order_index: number = 0;

    constructor( name_question?: string , type?: string , use_custom_option?: boolean, typology_id?: number, use_for_counter?: boolean ){
        this.status = new TypologyId()
        this.status.typology_id =  env.DEFAULT_STATUS_ACTIVE;
        this.created_by_user = new AdmCreatedBy();

        this.type = (type)? type : '';
        this.use_custom_option = (use_custom_option) ? use_custom_option  : true;
        this.typology_id =   (typology_id) ? typology_id :  env.EMPTY_TYPOLOGY;
        this.name_question = (name_question) ? name_question :  'Pregunta Sin título';
        this.use_for_counter =(use_for_counter) ? use_for_counter : false
     }
}

export class QuestionOptions {
    option_id: number = 0;
    value: string = '';
    status_id : number = 160445;
}

export class FilterFormParams {
    module :number
    category: number
}