import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'; 
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { OrganizationsService } from './organizations.service';


@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  $destroy: Subject<any>;
  constructor(
    private dialog: MatDialog,
    private orgService : OrganizationsService
  ) { 
    this.$destroy =  new Subject();
  }

  ngOnInit(): void {
  }

  openOrgForm(){
    const dialogRef = this.dialog.open(OrganizationFormComponent, {
      width: '550px',
      data: {

      }
    })

    dialogRef.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(org => {
        if (org) {
          this.orgService.createORG(org);
        }
      })
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
