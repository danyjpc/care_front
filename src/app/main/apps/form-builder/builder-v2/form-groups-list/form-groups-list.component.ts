import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GryposByForm } from '../../AdmForms';
import { FormBuilderService } from '../../form-builder.service';
import { GroupEditCreateComponent } from '../group-edit-create/group-edit-create.component';

@Component({
  selector: 'app-form-groups-list',
  templateUrl: './form-groups-list.component.html',
  styleUrls: ['./form-groups-list.component.scss']
})
export class FormGroupsListComponent implements OnInit {
  
  groups: GryposByForm[] = [];
  form_id: number = 0;
  $destroy: Subject<any>;
  
  constructor(
    private formService: FormBuilderService,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { 
    this.form_id = (this.activateRoute.snapshot.params.form_id) ? this.activateRoute.snapshot.params.form_id : 0;
    this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.get_groups()
  }

  get_groups(){
    
    this.formService.get_groups_by_form(this.form_id)
    
    // observable to update groups list when created or deleted one.
    this.formService.OnFormGrupChange
      .pipe(takeUntil(this.$destroy))
      .subscribe(groups => {
        this.groups = groups as GryposByForm[]
      }) 
  }

  async add_new_group_modal(){
    const dialogRef = this.dialog.open(GroupEditCreateComponent, {
      //width: '250px',
      data: null
    })
    dialogRef.afterClosed().subscribe(async group => {
      if (group) {
        await this.formService.create_new_group(this.form_id, group)
      }
    })
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }



}
