import {environment as env} from 'environments/environment';
export class AdmTypology {
    typology_id = 0;
    interno_id = 0;
    description = '%';
    valor_1 = '%';
    valor_2 = '%';
    es_editable: true;
    childs: TypologyId[]; 
    tipologia_padre: TypologyId;
    
    constructor() {
        this.tipologia_padre = new TypologyId();
        this.tipologia_padre.typology_id = env.PARENT_DEFAULT;
    }
}

export class TypologyId {
    typology_id = env.DEFAULT_STATUS_ACTIVE;
    description = '%';
    valor_1: string = '%';

    
}
