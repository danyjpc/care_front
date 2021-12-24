import {environment as env} from '../../../environments/environment';
import { AdmTypology, TypologyId } from './AdmTypology';

export class AdmPerson {
    persona_id = 0;
    cuenta_direccion_id = 0;
    cuenta_telefono_id = 0;
    cuenta_documento_id = 0;
    nombres = '';
    nombre_completo = '';
    apellidos = '';
    nacimiento = env.TODAY;
    profesion: AdmTypology;
    religion: AdmTypology;
    tipo_sangre: AdmTypology;
    genero: AdmTypology;
    estado_civil: AdmTypology;
    estado: AdmTypology;
    pasaporte = 'S/D';
    dpi = 0;
    correo = '';
    nit = 0;
    ocupacion = '%';
    nombre_factura = '%';
    nit_factura = '%';
    nombre_padre = '%';
    ocupacion_padre = '%';
    tel_ocu_padre = 0;
    nombre_madre = '%';
    ocupacion_madre = '%';
    tel_ocu_madre = 0;
    es_doctor =  false;
    es_paciente =  false;
    es_encargado = false;
    es_empleado =  false;
    persona_encargado_id = 0;
    fecha_creacion: string = env.TODAY;
    color_calendario: string = '#4dd0e1';

    constructor(){
        this.profesion = new AdmTypology();
        this.profesion.typology_id = env.EMPTY_TYPOLOGY;

        this.religion = new AdmTypology();
        this.religion.typology_id = env.EMPTY_TYPOLOGY;

        this.tipo_sangre = new AdmTypology();
        this.tipo_sangre.typology_id = env.EMPTY_TYPOLOGY;

        this.genero = new AdmTypology();
        this.genero.typology_id = 160023; // hombre
        

        this.estado_civil = new AdmTypology();
        this.estado_civil.typology_id = 160053; // soltero
        

        this.estado = new AdmTypology();
        this.estado.typology_id = env.DEFAULT_STATUS_ACTIVE;

    }

}

export class PersonId {
    persona_id = 0;
    nombres: string;
    apellidos: string;
    color_calendario: string;
}
