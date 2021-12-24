export class AdmGlobalSearch {
    total_records: number = 0;
    records : AdmRecords [] = [];

}

export class AdmRecords {
    form_id: number = 0
    form_name: string =""
    survey_id: number = 0
    question_id: number = 0
    question: string = ""
    answer_id: number = 0
    answer: string = ""
    module_id: number = 0
    module_name: string = ""
    category_id: number = 0
    category_name: string = ""
    date_created: Date = new Date()
}