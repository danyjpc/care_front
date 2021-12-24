import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from 'app/core/services/api.service';
import { UtilsService } from 'app/core/services/utils.service';
import { timeStamp } from 'console';
import { reject } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { AdmForm } from '../form/AdmForm';
import { AdmForms, FilterFormParams, GryposByForm, Questions } from './AdmForms';

@Injectable({
    providedIn: 'root'
})
export class FormBuilderService {

    OnFormGrupChange: BehaviorSubject<any>;
    OnFormsListChange: BehaviorSubject<any>;
    onQuestionsGroupChange: BehaviorSubject<any>;


    constructor(
        private formBuilder: FormBuilder,
        private api : ApiService,
        private utils: UtilsService,
        private fuseprogressBar: FuseProgressBarService
    ) {
        this.OnFormGrupChange = new BehaviorSubject([]);
        this.OnFormsListChange = new BehaviorSubject([]);
        this.onQuestionsGroupChange = new BehaviorSubject([]);
    }

    create_questions() {
        const question =  this.formBuilder.group({
          pregunta_id: 0,
          pregunta: 'Pregunta Sin título',
          input_type: 'text',
          question_options: this.formBuilder.array([this.crate_question_options()]),
           
        })
        return question
    }
    
    create_question_group(initialGroup: boolean){
        const groupName = (initialGroup) ? 'Default Group' : ''
        const questions_groups = this.formBuilder.group({
          group_name: groupName,
          questions:  this.formBuilder.array([this.create_questions()])
        })
        return questions_groups;
    }

    crate_question_options(index?){
        return this.formBuilder.control('Nueva Opción')
    }

    get_groups_by_form(form_id) {
        return new Promise((resolve, reject) => {
            const url = `/rest/builder/v1/${form_id}/group`
            this.fuseprogressBar.show();

            this.api.getMethod(url).then((groups: GryposByForm[] ) => {
                this.fuseprogressBar.hide();
                const _sorted_groups = groups.sort((a,b) => a.group_id - b.group_id)
                this.OnFormGrupChange.next(_sorted_groups)
                resolve (groups as GryposByForm[])
            })
            .catch(error => {
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Error al obtener los grupos del formulario')
                reject (error)
            })
        })
        
    }

    create_new_group(form_id, group: GryposByForm) {

        return new Promise((resolve, reject) => {
            const url = `/rest/builder/v1/${form_id}/group`
            this.fuseprogressBar.show();

            this.api.postMethod(url, group).then(groups => {
                this.fuseprogressBar.hide();
                this.get_groups_by_form(form_id)
                resolve (groups as GryposByForm[])
            })
            .catch(error => {
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Error al crear nueva sección del formulario')
            })
        })
    }

    update_new_group(form_id, group: GryposByForm) {

        return new Promise((resolve, reject) => {
            const url = `/rest/builder/v1/${form_id}/group/${group.group_id}`
            this.fuseprogressBar.show();

            this.api.putMethod(url, group).then(groups => {
                this.fuseprogressBar.hide();
                this.get_groups_by_form(form_id)
                resolve (groups as GryposByForm[])
            })
            .catch(error => {
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Error al actualizar nueva sección del formulario')
            })
        })
    }


    get_available_forms(params?: FilterFormParams){
        if(params && params.category === 0) {
            delete params.category
        }
        
        const url = "/rest/surveys/v1"
        this.fuseprogressBar.show()
        return new Promise((resolve, reject) => {
            this.api.getMethod(url, params).then((formularios: AdmForms[]) => {
                const _sortedForms =  formularios.sort((a,b) => b.form_id - a.form_id)
                this.fuseprogressBar.hide();
                this.OnFormsListChange.next(_sortedForms)
                resolve(_sortedForms as AdmForms[])
            })
            .catch(error => {
                this.fuseprogressBar.hide()
                this.utils.openSnackBar('error al listar formularios')
                reject (error)
            })
        })
    }

    get_single_form(form_id): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `/rest/surveys/v1/${form_id}`
            this.fuseprogressBar.show();
            this.api.getMethod(url).then(formulario => {
                this.fuseprogressBar.hide();
                resolve (formulario as AdmForms)
            })
            .catch(error => {
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Error al Obtener El formulario solicitado')
            })
        })
    }


    get_questions_by_group(form_id: number, group: GryposByForm): Promise<any>{
        return new Promise((resolve, reject) => {
            const url = `/rest/builder/v1/form/${form_id}/group/${group.group_id}/questions`
            this.fuseprogressBar.show();
            this.api.getMethod(url).then(questions => {
                this.fuseprogressBar.hide();

                this.onQuestionsGroupChange.next(questions as Questions[])
                resolve (questions as Questions[])
            })
            .catch(error => {
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Error al Obtener las preguntas del grupo solicitado')
            })
        })
    }

    create_question_in_group(form_id: number, group: GryposByForm,  question: Questions): Promise<any> {
        return  new Promise ((resolve, reject) => {
            const url = `/rest/builder/v1/form/${form_id}/group/${group.group_id}/questions`
            this.fuseprogressBar.show();
            this.api.postMethod(url, question).then(res => {
                this.fuseprogressBar.hide();
                resolve (true)
            })
            .catch(error => {
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Error al crear la pregunta en grupo seleccioando')
            })
        })
    }

    update_question_in_group(form_id: number, group: GryposByForm,  question: Questions){
        return  new Promise ((resolve, reject) => {
            const url = `/rest/builder/v1/form/${form_id}/group/${group.group_id}/questions/${question.question_id}`
            this.fuseprogressBar.show();
            this.api.putMethod(url, question).then(res => {
                this.fuseprogressBar.hide();
                this.get_questions_by_group(form_id, group)
                resolve (true)
            })
            .catch(error => {
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Error al actualizar la pregunta en el  grupo seleccioando')
            })
        })
    }

    create_new_form(formulario: AdmForms): Promise<any> {
        return new Promise ((resolve, reject) => {
            this.fuseprogressBar.show();
            const url = `/rest/surveys/v1`

            this.api.postMethod(url, formulario)
                .then(res => {
                    this.fuseprogressBar.hide()
                    resolve(res)
                    this.get_available_forms();
                })
                .catch(error => {
                    this.fuseprogressBar.hide()
                    this.utils.openSnackBar('Hubo un error al crear el formulario')
                    reject(error)
                })
        })
    }

    update_formulario(formulario: AdmForms): Promise<any> {
        return new Promise ((resolve, reject) => {
            this.fuseprogressBar.show();
            const url = `/rest/surveys/v1/${formulario.form_id}`

            this.api.putMethod(url, formulario)
                .then(res => {
                    this.fuseprogressBar.hide()
                    resolve(res)
                    this.get_available_forms();
                })
                .catch(error => {
                    this.fuseprogressBar.hide()
                    this.utils.openSnackBar('Hubo un error al Actualizar el formulario')
                    reject(error)
                })
        })
    }

    sendEmail(parms){
        this.fuseprogressBar.show();
        const url =  `/rest/surveys/v1/sendemail`;
        return new Promise ((resolve, reject) =>{
            this.api.sendEmail(url, parms).then(res => {
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Se envió el link al correo electrónico con éxito')
                resolve(res)
            }).catch(error=>{
                this.fuseprogressBar.hide()
                this.utils.openSnackBar('Hubo un error al enviar el correo, intente de nuevo')
                reject(error)
            })
        })
    }

    updIndex(questions):Promise<any>{
        const url = `/rest/builder/V1/form/`;
        this.fuseprogressBar.show();

        return new Promise((resolve,reject)=>{
            this.api.putMethod(url, questions).then(res=>{
                this.fuseprogressBar.hide();
                resolve(res)
            }).catch(error=>{
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Hubo un error al actualizar el orden de las preguntas')
                reject(error)
            })
        })
    }

}