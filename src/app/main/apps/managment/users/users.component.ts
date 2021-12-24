import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersService } from './users.service';
import * as moment from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  $destroy: Subject<any>;
  constructor(
    private dialog: MatDialog,
    private usersService: UsersService
  ) { 
    this.$destroy =  new Subject();
  }

  ngOnInit(): void {
  }

  open_dialog_form(){
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      height: '530px',
      data: {

      }
    })

    dialogRef.afterClosed()
      .subscribe(userForm => {
        if (userForm) {
            this.usersService.create_user(userForm);
        }
      })
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
