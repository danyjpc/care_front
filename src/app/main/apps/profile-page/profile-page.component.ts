import { Component, OnInit } from '@angular/core';
import { UsersService } from '../managment/users/users.service';
import { AdmUser, AdmChangePassword } from '../managment/users/AdmUser';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../managment/users/user-form/user-form.component';
import { Location } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user_id = 0;
  user: AdmUser = new AdmUser();

  $destroy: Subject<any>;

  constructor(private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private _location: Location
  ) {
    this.user_id = this.route.snapshot.params.user_id;
    this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.getUser(this.user_id);

    //subscribe for change user
    this.userService.OnUpdateUserChange
      .pipe(takeUntil(this.$destroy))
      .subscribe((users) => {
        this.user = users as AdmUser
      })
  }

  async getUser(user_id) {
    this.user = await this.userService.getUserById(user_id) as AdmUser;
    //console.log(this.user);
  }

  openEditFormUser(userForm: AdmUser) {
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

  openFormChangePass(admUser: AdmUser){
    const newPass = true;
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      data:{
        admUser,
        newPass
      }
    })
    dialogRef.afterClosed()
      .subscribe(changePass =>{
        if(changePass){
          changePass.user_id= admUser.user_id;
          this.userService.changePassword(changePass);
          //console.log(changePass)
        }
        
      }) 
  }

  backClicked() {
    this._location.back();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    
  }

}
