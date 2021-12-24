import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmChangePassword, AdmUser } from '../../managment/users/AdmUser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePass : AdmChangePassword =  new AdmChangePassword();
  admUser : AdmUser ;
  useNewPass : boolean;
  user_id_logged : number = 0;

  type = 'password';

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data, 
  )
  {
    this.user_id_logged = parseInt( JSON.parse( sessionStorage.getItem('user') )['user_id'] );
    this.admUser = data.admUser;
    //this.useNewPass = (data && data.newPass) ? data.newPass : false;
  }

  ngOnInit(): void {
    this.userLogged();
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

  //metodo que confirma si la contraseña anterior coincide
  /*oldPassConfirm():boolean{
    console.log(this.admUser.password)
    if(this.changePass.old_pass == this.admUser.password){
      return true
    }else{
      return false
    }
  }*/

  userLogged() {
    if(this.admUser.user_id == this.user_id_logged){
      this.useNewPass = true;  
    }else{
      this.useNewPass= false;
      this.changePass.old_pass = this.admUser.password;
    }
  }

  //metodo que compara la nueva contraseña y la confirmacion para saber si son identicas
  coincidencia():boolean{
    if(this.changePass.new_pass ==this.changePass.confirm_pass){
      return true
    }else{
      return false
    }
  }

}
