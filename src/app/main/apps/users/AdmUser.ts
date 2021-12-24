import {environment as env} from 'environments/environment';
import {AdmTypology, TypologyId} from 'app/shared/adm-models/AdmTypology';
import { AdmPerson } from 'app/shared/adm-models/AdmPerson';


export class  AdmUser{
    usuario_id = 0;
    persona: AdmPerson;
    password = '';
    email = '';
    nombre_completo = '';
    estado_usuario: AdmTypology;
    fecha_creacion: string =  env.TODAY;
    rol_usuario: AdmTypology;

    // extra data
    telefono: number = 0;
    direccion: string = 'S/D';
    color_calendario: string;

    constructor(){ 
        this.persona = new AdmPerson();
        
        this.estado_usuario = new AdmTypology();
        this.estado_usuario.typology_id =  env.DEFAULT_STATUS_ACTIVE;

        this.rol_usuario = new AdmTypology();
        this.rol_usuario.typology_id =  env.DEFAULT_ROLE_AMINISTRATOR;

        this.color_calendario =  this.persona.color_calendario;
    }

}


export class AdmCreatedBy {
    user_id: number = 1;
    nombre_completo: string = '%';
    persona_id: number = 1; 
    constructor(){
        const session = JSON.parse(sessionStorage.getItem('user'));
        //console.log(session)
        if(session !== null){
            this.user_id = session['user_id'];
            this.persona_id = session['person_id'];
        }else{
            //si no encuentra el usuario, asigna un user_id =0
            //esto significa que el usuario es publico, funciona para el servicio
            //submit_answers de form.service del componente form
            this.user_id =0;
        }
        
    }
}

export class AdmUserLogued {
    email: string = '' ;
    user_id: number = 0  ;
    persona_id: number = 0 ;
    nombre_completo: string = '';
    id_rol: number = 0;
    nombre_rol: string = '';
    role: string = '';

}



