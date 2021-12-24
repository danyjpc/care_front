import { TypologyId } from './AdmTypology';
import { environment  as env} from '../../../environments/environment';
import { AdmCreatedBy, AdmUser } from '../../main/apps/users/AdmUser';


export class AdmAddress {
    direccion_id: number = 0;
    cuenta_direccion_id: number = 0;
    direccion_principal: string = '';
    direccion_alterna: string = '%';
    codigo_zip: string = '%';
    longitud: number = 0;
    latitud: number = 0;
    altitud: number = 0;
    pais: TypologyId;
    departamento_direccion: TypologyId;
    municipio_direccion: TypologyId;
    zona_direccion: TypologyId;
    fecha_creacion: string =  env.NOW;
    creado_por_usuario: AdmUser;
    estado_direccion: TypologyId;
    lider: boolean = true;

    constructor() {
        this.pais = new TypologyId();
        this.departamento_direccion = new TypologyId();
        this.municipio_direccion = new TypologyId();
        this.zona_direccion = new TypologyId();

        // defaults
        this.pais.typology_id =  env.DEFAULT_PAIS_TYPOLOGY;
        this.departamento_direccion.typology_id =  env.DEFAULT_DEPARTAMENTO_TYPOLOGY;
        this.municipio_direccion.typology_id = env.DEFAULT_MUNICIPIO_TYPOLOGY;
        this.zona_direccion.typology_id =  env.DEFAULT_ZONA_TYPLOGY;
        this.creado_por_usuario =  new AdmUser();

        const createdBy =  new AdmCreatedBy();
        this.creado_por_usuario.usuario_id =  createdBy.user_id;

    }   
    

}

