import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from '../../../form.service';
import { AdmSurveyAnswers, AdmUpdateStatusSurvey } from '../../../AdmForm';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { environment as env } from 'environments/environment';

import { AlertDialogComponent } from 'app/shared/utils-components/alert-dialog/alert-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-statistics-answers-list',
  templateUrl: './form-statistics-answers-list.component.html',
  styleUrls: ['./form-statistics-answers-list.component.scss']
})
export class FormStatisticsAnswersListComponent implements OnInit {

  form_id = 0;
  displayedColumns: string[] =[];
  nameColumns: string [] = []
  listAnswer : AdmSurveyAnswers = new AdmSurveyAnswers();
  dataSource = null;
  lenghtData : number;

  selection = new SelectionModel<string[]>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  $destroy: Subject<any>;

  constructor(private formService : FormService,
    private route: ActivatedRoute, private router: Router,
    private dialog: MatDialog,)
    {
      this.form_id = this.route.snapshot.params.form_id;
      this.$destroy = new Subject();
    }

  ngOnInit(): void {
    this.getAnswer(this.form_id)
  }

  async getAnswer(form_id){
    
    this.listAnswer = await this.formService.getAnswers(form_id) as AdmSurveyAnswers;
    if(this.listAnswer!=null){
      this.lenghtData = this.listAnswer.answers.length;
      this.displayedColumns= this.listAnswer.question_labels;
      
      this.displayedColumns.unshift('select')
      this.displayedColumns.push('Eliminar')
      //Array que nos sirve para evitar la duplicidad en matcolumndef 
      this.nameColumns = this.displayedColumns.map((x, index)=>index+'-'+x);

      this.dataSource = new MatTableDataSource<string[]>(this.listAnswer.answers);
      this.dataSource.paginator = this.paginator;
    }else{
      this.lenghtData=0;
    }  
  }
  //Metodo que elimina un registro
  async deleteAnswer(answer){
    let survey_id = parseInt(answer[0]); 
    await this.formService.updateStatusSurvey(survey_id);
    this.selection.clear();
    this.ngOnInit();
  }

  //Metodos para eliminar lo registros seleccionados 
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  openDeleteConfirm(){
    let SurveysDelete : AdmUpdateStatusSurvey[] =[]; 
    
    const alertDialog = this.dialog.open(AlertDialogComponent,{
    })
    alertDialog.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(async(bool: boolean) =>{
        if(bool){

          this.selection.selected.forEach(answer => {
            let survey: AdmUpdateStatusSurvey = new AdmUpdateStatusSurvey();
            survey.survey_id=parseInt(answer[0]);
            survey.status.typology_id=env.DEFAULT_STATUS_INACTIVE;
            SurveysDelete.push(survey)
      
          });
          //console.log(AnswerDelete);
          await this.formService.updateSurveysStatus(SurveysDelete)
          this.selection.clear();
          this.ngOnInit();
        }
      })
  }

  //detiene los subscribe, junto con el takeUntil
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
