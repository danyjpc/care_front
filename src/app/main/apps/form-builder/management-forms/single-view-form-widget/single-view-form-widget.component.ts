import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdmForms } from '../../AdmForms';
import { FormBuilderService } from '../../form-builder.service';
import { FormsCreateEditComponent } from '../forms-create-edit/forms-create-edit.component';
import { AlertDialogComponent } from 'app/shared/utils-components/alert-dialog/alert-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ClipboardService } from 'ngx-clipboard';
import { UtilsService } from 'app/core/services/utils.service';
import { InputDialogComponent } from 'app/shared/utils-components/input-dialog/input-dialog.component';
import { environment  as env} from 'environments/environment'; 

@Component({
  selector: 'app-single-view-form-widget',
  templateUrl: './single-view-form-widget.component.html',
  styleUrls: ['./single-view-form-widget.component.scss']
})
export class SingleViewFormWidgetComponent implements OnInit {

  @Input() formulario: AdmForms;
  $destroy: Subject<any>;
  URL = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private formService: FormBuilderService,
    private _location: Location,
    private clipboardApi: ClipboardService,
    private utilService : UtilsService
  ) {
    this.$destroy = new Subject();
  }

  ngOnInit(): void {
  }

  go_to_builder_page() {
    const url = `/form-builder/v2/${this.formulario.form_id}`
    this.router.navigateByUrl(url);
  }

  open_edit_form(formulario: AdmForms) {
    const dialogRef = this.dialog.open(FormsCreateEditComponent, {
      width: '550px',
      data: {
        formulario
      }
    })


    dialogRef.afterClosed()
      .subscribe(formulario => {
        if (formulario) {
          this.formService.update_formulario(formulario)
        }
      })
  }

  delete_form(formulario: AdmForms) {
    const alertDialog = this.dialog.open(AlertDialogComponent, {
    })
    alertDialog.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(async (bool: boolean) => {
        if (bool) {
          formulario.status.typology_id = env.DEFAULT_STATUS_INACTIVE;
          this.formService.update_formulario(formulario);
        }
      })
  }

  copyURL(formulario: AdmForms) {
    this.URL = this.generateURL(formulario.form_id)
    this.clipboardApi.copyFromContent(this.URL);
    this.utilService.openSnackBar('Se copio el URL')
  }

  sendEmail(formulario: AdmForms) {
    const alertDialog = this.dialog.open(InputDialogComponent, {
    })
    alertDialog.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(async (email: string) => {
        if (email) {
          const publicURL = this.generateURL(formulario.form_id);
          const toEmail =email;
          const parms = { publicURL, toEmail}
          this.formService.sendEmail(parms);
        }
      })
  }

  generateURL(form_id):string{
    const url = window.location.origin + '/pages/public/survey/' + form_id + '/questions';
    return url
  }

  sendWhatsApp(form : AdmForms){
    const dialog = this.dialog.open(InputDialogComponent,{
      data:{
        inputNumber : true
      }
    })
    dialog.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(async (phoneNumber: number)=>{
        if (phoneNumber){
          const whatsUrl = 'https://wa.me/502'+phoneNumber+'/?text='+this.generateURL(form.form_id)
          window.open(whatsUrl);
        }
      })
  }

  //detiene los subscribe, junto con el takeUntil
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
