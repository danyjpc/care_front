import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdmForms } from '../AdmForms';
import { FormBuilderService } from '../form-builder.service';
import { FormsCreateEditComponent } from './forms-create-edit/forms-create-edit.component';

@Component({
  selector: 'app-management-forms',
  templateUrl: './management-forms.component.html',
  styleUrls: ['./management-forms.component.scss']
})
export class ManagementFormsComponent implements OnInit {
  $destroy: Subject<any>;

  constructor(
    private dialog: MatDialog,
    private formService: FormBuilderService
  ){
    this.$destroy = new Subject();
   }

  ngOnInit(): void {
  }


  open_dialog_form(){
    const dialogRef = this.dialog.open( FormsCreateEditComponent, {
      width: '500px',
      
    })

    dialogRef.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe((formulario: AdmForms) => {
        if (formulario) {
          // Creo un formulario
          this.formService.create_new_form(formulario);

        }
      })
  }

  create_new_form(){

  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
