export class FormModelStats {
    total_surveys: number;
    questions: QuestionStats[]=[]
}


export class QuestionStats {
    question_name: string;
    question_type: string;
    stats: Object
}
