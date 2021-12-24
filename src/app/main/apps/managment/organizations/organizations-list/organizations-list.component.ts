import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrganizationsService } from '../organizations.service';
import { AdmOrganization } from '../AdmOrganization';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';


@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationsListComponent implements OnInit {

  listORGs : AdmOrganization [] = [];
  displayedColumns: string[] = ['id', 'name', 'url', 'date', 'edit'];
  $destroy: Subject<any>;

  constructor(
    private orgService : OrganizationsService,
    private dialog: MatDialog,
  )
  {
    this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.getListORGs();

    this.orgService.OnListaORGsChange
      .pipe(takeUntil(this.$destroy))
      .subscribe((org)=>{
        this.listORGs = org ;
      })

  }

  async getListORGs(){
    this.listORGs = await this.orgService.getORGs() as AdmOrganization [];
    console.log(this.listORGs);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    
  }
  
  open_edi_form(orgForm : AdmOrganization){
    const dialogRef = this.dialog.open(OrganizationFormComponent, {
      width: '550px',
      data: {
        orgForm
      }
    })
    //despues de que cierre el modal
    dialogRef.afterClosed()
      .subscribe(org => {
        if (org) {
            this.orgService.updateORG(org);
        }
      })
  }
}
