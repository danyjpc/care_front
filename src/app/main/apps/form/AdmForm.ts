import { environment as env } from "environments/environment";
import { AdmCreatedBy } from "../users/AdmUser";
import {TypologyId}  from '../../../shared/adm-models/AdmTypology'

export class AdmForm {
    form_id:number;
    name_form: string;
    is_public: boolean = false;
    module : AdmModule;
    category : AdmCategory;
    nrecorded : number;
    lastrecorded : string;
}

export class AdmQuestionGroup{
    name_group : string;
    questions : Questions [] = [];

}
export class Questions {
    question_id: number = 0;
    name_question: string = '';
    type: string;
    use_custom_option: boolean = true;
    typology_id: number = env.EMPTY_TYPOLOGY;
    options: QuestionOptions[]=[];
}

export class QuestionOptions {
    option_id: number = 0;
    value: string = 'Opción 1';
    status_id: number = 160445;
}

export class AdmCategory{
    category_id : number = 0;
    name_category : string = '';
}

export class AdmModule{
    module_id : number = 0 ;
    name_module : string = '';
}


export class AdmAnswer {
    question_id:  number;
    answer: string;
    created_by_user: AdmCreatedBy

    constructor (question_id, answer) {
        this.question_id = (question_id) ?  question_id : 0 ,
        this.answer  = (answer) ?  answer : '';
        this.created_by_user = new AdmCreatedBy();

        delete this.created_by_user.nombre_completo;
        delete this.created_by_user.persona_id;
    }
}

//View statistics
export class AdmSurveyRecords{
    survey_id : 0;
    created_by_user : CreatedBy

}

export class CreatedBy{
    user_id :0;
    email : '';
    name : '';
    dapartamento: '';
    municipio: '';
    date_created
}

//View all answers
export class AdmSurveyAnswers{
    form_id : number = 0;
    name_form : string = '';
    question_labels : Array<string>;
    answers : Array<Array<string>>;
}

export class AdmUpdateStatusSurvey{
    survey_id : number = 0
    status: TypologyId;
    constructor(){
        this.status = new TypologyId();
        this.status.typology_id = env.DEFAULT_STATUS_ACTIVE
    }
}