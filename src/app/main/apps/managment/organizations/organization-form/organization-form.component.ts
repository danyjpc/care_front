import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmOrganization } from '../AdmOrganization';
import { UtilsService } from 'app/core/services/utils.service';
import { environment as env } from 'environments/environment';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {

  title: string;
  org: AdmOrganization;

  constructor(
    public dialogRef: MatDialogRef<OrganizationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) 
  {
    this.title = (data && data.orgForm) ? 'Editar' : 'Agregar';
    this.org = (data && data.orgForm) ? data.orgForm : new AdmOrganization();
  }

  ngOnInit(): void {

  }

}
