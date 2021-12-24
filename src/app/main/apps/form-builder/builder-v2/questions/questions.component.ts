import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GryposByForm, Questions } from '../../AdmForms';
import { InputFormTypes } from '../../form-builder-input-types';
import { FormBuilderService } from '../../form-builder.service';
import { environment as env } from 'environments/environment';
import { UtilsService } from 'app/core/services/utils.service';
import { QuestionOptions } from 'app/main/apps/form/AdmForm';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @Input()question: Questions;
  @Input()group: GryposByForm;

  InputFormTypes = InputFormTypes;
  form_id: number = 0;
  icon: string = 'short_text';
  typologiesData: AdmTypology;

  constructor(
    private formService: FormBuilderService,
    private activeRoute: ActivatedRoute,
    private utils: UtilsService,
    
  ) 
  { 
    this.form_id = (this.activeRoute.snapshot.params.form_id) ? this.activeRoute.snapshot.params.form_id : 0;
    this.typologiesData = new AdmTypology();
  }

  ngOnInit(): void {
    this.icon =  this.get_icon()

    this.load_typologies_data();
  }

  remove_question_from_group(){

    this.utils.openConfirDialogService('Se Eliminará la pregunta seleccionada, Continuar?')
      .subscribe(response => {
          if(response) {
            this.question.status.typology_id = env.DEFAULT_STATUS_INACTIVE
            this.update_question(this.form_id, this.group, this.question)
          }
      })
    

  }


  hasOptions() {
    return  this.InputFormTypes.filter(type => type.value == this.question.type)[0].hasOptions    
  }

  get_icon(){
    return  this.InputFormTypes.filter(type => type.value == this.question.type)[0].icon    
  }

  use_for_counter() {
    return  this.InputFormTypes.filter(type => type.value == this.question.type)[0].use_for_counter    
  }

  async add_option_to_question(){
    const option = new QuestionOptions()
    option.value = `Opción ${this.question.options.length + 1}`
    this.question.options.push(option)
    await this.update_question(this.form_id, this.group, this.question)
    
  }

  async remove_option_from_question(index){
    this.question.options[index].status_id= env.DEFAULT_STATUS_INACTIVE;
    this.valueChange() 
  }

  valueChange(){
    this.question.use_custom_option = this.hasOptions();
    this.icon = this.get_icon()
    this.question.use_for_counter =  this.use_for_counter();
    this.update_question(this.form_id, this.group, this.question)
  }

  async update_question(form_id: number, group: GryposByForm,  question: Questions) {
      await this.formService.update_question_in_group(this.form_id, group, question)
  }


  async load_typologies_data(){
    if ( this.question.typology_id  !== env.EMPTY_TYPOLOGY &&  (this.question.type === 'state'  || this.question.type === 'city')) {
      this.typologiesData =  await this.utils.getTypology(this.question.typology_id) as AdmTypology;
    }
  }


}
