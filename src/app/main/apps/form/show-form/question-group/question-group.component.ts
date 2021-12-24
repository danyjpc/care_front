import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../form.service';
import { AdmAnswer, AdmQuestionGroup } from '../../AdmForm';
import { Router, ActivatedRoute } from '@angular/router';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import { UtilsService } from 'app/core/services/utils.service';
import { NgForm } from '@angular/forms';
import { AlertDialogComponent } from 'app/shared/utils-components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-question-group',
  templateUrl: './question-group.component.html',
  styleUrls: ['./question-group.component.scss']
})
export class QuestionGroupComponent implements OnInit {

  quesiton_group : AdmQuestionGroup [] = [];
  form_id : 0;
  @Input() showButton : string;
  statesTypology: AdmTypology;
  @Input() isPublic : boolean;
  $destroy: Subject<any>;
  

  constructor(private formService : FormService,
    private route: ActivatedRoute, private router: Router,
    private utils: UtilsService,
    private dialog: MatDialog,
    private _location : Location
  ) 
  {
    this.form_id = this.route.snapshot.params.form_id;
    this.statesTypology = new AdmTypology();
    this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.ListQuestionsGroup(this.form_id);
  }

  ListQuestionsGroup(form_id){
    this.formService.get_question_by_form(form_id).then(data =>{
      this.quesiton_group = data;
    })
  }


  async getCityData(value) {
    
    this.statesTypology =  await this.utils.getTypology(value) as AdmTypology;
  }


  async send_answers(form: NgForm) {
    const formData = form.value;

    // Trasnform Form Value to Json Answer Payload
    const Answers: AdmAnswer[] = Object.keys(formData).map( key => {
      const question_id = Number(key);  
      const answer = (formData[key])  ? formData[key].toString() : '' ;
      return new AdmAnswer(question_id, answer);
    })

    //console.log(Answers)

    const response = await this.formService.submit_answers(this.form_id, Answers, this.isPublic)

    if (response) {
      this.openConfirDialog(form);
      //form.reset();
    }

  }

  openConfirDialog(form: NgForm){
    const confirm = true;
    const confirmDialog = this.dialog.open(AlertDialogComponent,{
      data : {
        confirm
      } 
    })
    confirmDialog.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(async (bool:boolean) =>{
        if(bool){
          form.reset();
        }else{
          this._location.back();
        }
      })
  }
  
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    
  }

}
