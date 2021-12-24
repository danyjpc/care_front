import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GryposByForm, Questions } from '../../AdmForms';
import { FormBuilderService } from '../../form-builder.service';
import {InputFormTypes, InputTypes} from '../../form-builder-input-types';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GroupEditCreateComponent } from '../group-edit-create/group-edit-create.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment as env } from 'environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertDialogComponent } from 'app/shared/utils-components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-form-groups',
  templateUrl: './form-groups.component.html',
  styleUrls: ['./form-groups.component.scss']
})
export class FormGroupsComponent implements OnInit {
  @Input()group: GryposByForm
  //groups: GryposByForm[] = [];
  inputTypes = InputFormTypes.filter(input => input.visibleOnList);
  form_id: number; 
  questions: Questions[]=[];
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
    //this.get_groups()
  }

  // get_groups(){
    
  //   this.formService.get_groups_by_form(this.form_id)
    
  //   // observable to update groups list when created or deleted one.
  //   this.formService.OnFormGrupChange
  //     .pipe(takeUntil(this.$destroy))
  //     .subscribe(groups => {
  //       this.groups = groups as GryposByForm[]
  //     }) 
  // }

  remove_group(group: GryposByForm){
      const dialogR = this.dialog.open(AlertDialogComponent, {

      })
      dialogR.afterClosed().subscribe(async bool =>{
        if(bool){
          group.status.typology_id = env.DEFAULT_STATUS_INACTIVE
          await this.formService.update_new_group(this.form_id, group)
        }
      })
  }

  async loadQuestions(group: GryposByForm){
    await this.formService.get_questions_by_group(this.form_id, group)

    this.formService.onQuestionsGroupChange
        .pipe(takeUntil(this.$destroy))
        .subscribe(questions => {
          this.questions = questions
        })
  }

  async add_new_group_modal(){
    const dialogRef = this.dialog.open(GroupEditCreateComponent, {
      //width: '265px',
      data: null
    })
    dialogRef.afterClosed().subscribe(async group => {
      if (group) {
        await this.formService.create_new_group(this.form_id, group)
      }
    })
  }

  async add_question_to_group(inputType: InputTypes, group?){

    const questionType = inputType.value;
    
    switch (questionType) {
      case 'location':
          const stateQuestion =  new Questions('Departamento', 'state', false, env.DEFAULT_PAIS_TYPOLOGY, true);
          stateQuestion.use_custom_option=false;
          const cityQuestion =   new Questions('Municipio', 'city', false, env.DEFAULT_DEPARTAMENTO_TYPOLOGY, false);
          cityQuestion.use_custom_option=false;
          await this.create_question(stateQuestion, group)
          await this.create_question(cityQuestion, group)
        break;
    
      default:
          const pregunta = new Questions();
          pregunta.type =  inputType.value
          pregunta.use_for_counter = inputType.use_for_counter,
          pregunta.use_custom_option = inputType.hasOptions
          await this.create_question( pregunta, group)
        break;
    }
  }

  async create_question(pregunta, group){
    try {
      await this.formService.create_question_in_group(this.form_id, group, pregunta)
      this.loadQuestions(group)
    } catch (error) {
      console.log(error)
    }
  }
  
  editar_from_group(group){     
    const dialogRef = this.dialog.open(GroupEditCreateComponent, {
      //width: '265px',
      data: {group}
    })

    dialogRef.afterClosed().subscribe(async group => {
      if (group) {
        await this.formService.update_new_group(this.form_id, group)
      }
    })
  }
  

  unloadQuestion(){
    this.$destroy.next();
    this.$destroy.complete();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next();
    this.$destroy.complete();
  }

  //Drag and Drop methods
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);

    for(var x=0; x<this.questions.length; x++){
      this.questions[x].order_index =x+1;
    }

    this.formService.updIndex(this.questions);
  }
}
