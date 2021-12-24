import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdmUser } from '../AdmUser';
import { UsersService } from '../users.service';
import { Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { ChangePasswordComponent } from 'app/main/apps/profile-page/change-password/change-password.component';
import { AlertDialogComponent } from 'app/shared/utils-components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: AdmUser[] = [];
  $destroy: Subject<any>;


  displayedColumns: string[] = ['id', 'user', 'email', 'role', 'actions'];

  constructor(
    private userService: UsersService,
    private router: Router,
    private dialog: MatDialog,
  ) { 

    this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.get_users_list()

    //subscribe for changes in user list
    this.userService.OnListaUsersChange
      .pipe(takeUntil(this.$destroy))
      .subscribe((users) => {
        this.users = users as AdmUser[]
      })

  }

  async get_users_list(){
    await this.userService.get_users()
  }


  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    
  }

  redirectPermissions(value){
    this.router.navigate(['managment/users/permission', value.user_id])
  }

  open_edi_form(userForm : AdmUser){
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      height: '530px',
      data: {
        userForm
      }
    })

    dialogRef.afterClosed()
      .subscribe(userForm => {
        if (userForm) {
            this.userService.update_user(userForm);
        }
      })
  }

  
  viewProfile(user_id){
    this.router.navigate(['/profile',user_id]);
  }

  openFormChangePass(admUser: AdmUser){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      data:{
        admUser
      }
    })
    dialogRef.afterClosed()
      .subscribe(changePass =>{
        if(changePass){
          changePass.user_id= admUser.user_id;
          //changePass.old_pass = admUser.password;
          this.userService.changePassword(changePass);
          //console.log(changePass)
        }
        
      }) 
  }

  openDeleteConfirm(admUser: AdmUser){
    const confirmDialog = this.dialog.open(AlertDialogComponent,{

    })
    confirmDialog.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(async (bool:boolean) =>{
        if(bool){
          admUser.status.typology_id=160447
          await this.userService.update_user(admUser)
        }
      })
  }
}
