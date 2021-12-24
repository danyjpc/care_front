import { AdmTypology, TypologyId } from './AdmTypology';
import { environment  as env} from '../../../environments/environment';
import { AdmCreatedBy, AdmUser } from '../../main/apps/users/AdmUser';



export class AdmPhone{
    telefono_id = 0;
    cuenta_telefono_id = 0;
    numero: number;
    tipo_telefono: AdmTypology;
    fecha_creacion: string = env.NOW;
    creado_por_usuario: AdmUser;
    lider = true;
    estado: AdmTypology;

    constructor() {
        this.tipo_telefono = new AdmTypology();
        this.tipo_telefono.typology_id =  env.DEFAULT_PHONE_CONTACT_TYPE;
        this.creado_por_usuario = new AdmUser();

        this.estado = new AdmTypology();
        this.estado.typology_id =  env.DEFAULT_STATUS_ACTIVE;

        const createdBy =  new AdmCreatedBy();
        this.creado_por_usuario.usuario_id =  createdBy.user_id;
    }
}


