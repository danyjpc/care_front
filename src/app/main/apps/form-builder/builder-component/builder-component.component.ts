import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {FormBuilderService} from './../form-builder.service'
import {InputFormTypes, InputTypes} from '../form-builder-input-types';
import { at } from 'lodash';

@Component({
  selector: 'app-builder-component',
  templateUrl: './builder-component.component.html',
  styleUrls: ['./builder-component.component.scss']
})
export class BuilderComponentComponent implements OnInit {

  surveyForm: FormGroup;
  formId: number = 123; 
  formName: string = 'abc';

  InputFormTypes = InputFormTypes

  constructor(
    private formBulderService: FormBuilderService, 
    private fb: FormBuilder
  ) 
  {

  }


  // GET, helper functions to manipulate more easly form controls

  survey(): FormArray {
    return this.surveyForm.get('survey') as FormArray
  }

  get formGroups() {
    return this.survey().controls
  }

  questionsByGroup(groupIndex: number) {
    return this.survey().at(groupIndex).get('questions') as FormArray
  }
  
  optionsByQuestions(groupIndex: number, questionIndex: number){
    return this.questionsByGroup(groupIndex).at(questionIndex).get('question_options') as FormArray
  } 

  questionType(groupIndex, questionIndex) {
    return this.questionsByGroup(groupIndex).at(questionIndex).get('input_type') as FormControl
  }


  add_group_form(){
    this.survey().push(this.formBulderService.create_question_group(false))
  }

  remove_group_form(groupIndex: number) {
    this.survey().removeAt(groupIndex)
  }

  add_question_to_group(groupIndex, type){
    const question =  this.formBulderService.create_questions();
    this.questionsByGroup(groupIndex).push(question)
  }

  remove_question_from_group(groupIndex, questionIndex){
    this.questionsByGroup(groupIndex).removeAt(questionIndex)
  }


  add_option_to_question(groupindex, questionIndex){
    const option =  this.formBulderService.crate_question_options();
    this.optionsByQuestions(groupindex, questionIndex).push(option)
  }


  remove_option_from_question(groupIndex, questionIndex, optionIndex ) {
    this.optionsByQuestions(groupIndex, questionIndex).removeAt(optionIndex)
  }


  hasOptions(indexGroup: number, indexQuestion: number) {
    const _value =  this.questionType(indexGroup, indexQuestion).value;
    return  this.InputFormTypes.filter(type => type.value == _value)[0].hasOptions    
  }

   ngOnInit() {
     this.intialFormBuilder();
  }
  
  intialFormBuilder(){
    this.surveyForm =  this.fb.group({
      form_id: this.formId,
      form_name: this.formName,
      survey: this.fb.array([this.formBulderService.create_question_group(true)])     
    })
  }


  CheckSelection(indexGroup, indexQuiestion) {
    this.hasOptions(indexGroup,indexQuiestion)
  }



  
}
