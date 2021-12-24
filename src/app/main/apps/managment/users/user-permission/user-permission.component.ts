import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdmGroupPermission } from '../AdmUser';
import { UsersService } from '../users.service';
import { Location } from '@angular/common';
import { AdmUser } from '../AdmUser';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss']
})
export class UserPermissionComponent implements OnInit {
  user_id : 0;
  ListPermissions : AdmGroupPermission[]=[];
  admUser : AdmUser = new AdmUser();
  
  constructor(
    private route: ActivatedRoute,
    public userService : UsersService,
    private _location: Location
  ) 
  {
    this.user_id = this.route.snapshot.params.user_id;
    this.getUser(this.user_id);
  }

  ngOnInit(): void {

    this.get_permissions(this.user_id);
  }

  async get_permissions(user_id){
    this.ListPermissions = await this.userService.get_group_permissions(user_id) as AdmGroupPermission[];
  }

  async getUser(user_id){
    this.admUser = await this.userService.getUserById(user_id) as AdmUser
  }

  updateState(){
    this.userService.update_group_permission(this.user_id, this.ListPermissions)
    this._location.back();
  }

  backClicked(){
    this._location.back();
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  trackByFn = (index, item) => item.id;
  
}
