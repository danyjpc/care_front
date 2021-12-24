import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmUser, AdmOrganization } from '../AdmUser';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AdmTypology, TypologyId}  from '../../../../../shared/adm-models/AdmTypology'
import { UtilsService } from '../../../../../core/services/utils.service';
import { environment as env } from "../../../../../../environments/environment";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  orgs : AdmOrganization [] =[];
  roles : AdmTypology;
  status : AdmTypology;
  city : AdmTypology;
  state : AdmTypology;
  type = 'password';

  title: string;

  user: AdmUser;
  

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public userService : UsersService,
    public utilService : UtilsService,
  ) 
  {
    this.title = (data && data.userForm) ? 'Editar' : 'Agregar';
    this.user = (data && data.userForm) ? data.userForm : new AdmUser();
    
    
    this.roles = new AdmTypology();
    this.status = new AdmTypology(); 
    this.city = new AdmTypology();
    this.state = new AdmTypology();
  }

  ngOnInit(): void {
    this.get_data();

    if(this.title === 'Editar'){
      this.load_city(this.user.person.state.typology_id);
    }

  }

  async get_data(){
    this.orgs = await this.userService.get_organizations() as AdmOrganization[];
    this.roles = await this.utilService.getTypology(env.ROLES_TYPOLOGY) as AdmTypology;
    this.status = await this.utilService.getTypology(env.STATUS_TYPOLOGY) as AdmTypology;
    this.state = await this.utilService.getTypology(env.DEFAULT_PAIS_TYPOLOGY) as AdmTypology;
    if(this.title==='Agregar'){
      this.city = await this.utilService.getTypology(env.DEFAULT_DEPARTAMENTO_TYPOLOGY) as AdmTypology;
    }
  }

  async load_city(state_id){
    this.city = await this.utilService.getTypology(state_id) as AdmTypology;
  }

  showInput(type?: string){
        
    switch (type) {
        case 'text':
            this.type = 'text'
            break;
        case 'pass':
            this.type = 'password'
            break;
        default:
            break;
    }
  }

}
