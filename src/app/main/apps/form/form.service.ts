import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { UtilsService } from 'app/core/services/utils.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AdmAnswer, AdmForm, AdmQuestionGroup, AdmSurveyRecords, AdmSurveyAnswers, AdmUpdateStatusSurvey } from './AdmForm';
import { AdmCategory } from '../category/AdmCategory';
import { AdmForms } from '../form-builder/AdmForms';
import {QuestionStats, FormModelStats} from './form-stats-model';
import {InputFormTypes} from '../form-builder/form-builder-input-types';
import * as Highcharts from "highcharts";
import { statSync } from 'fs';
import { keys, reject } from 'lodash';
import { environment as env } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  InputFormTypes = InputFormTypes;
  constructor(private api: ApiService, private utilService: UtilsService,  private fuseProgresBar: FuseProgressBarService) { }

  getForms(params?): Promise<any> {
    const url = `/rest/surveys/v1`
    this.fuseProgresBar.show();
    
    return new Promise((resolve, reject) => {
        this.api.getMethod(url, params).then(res => {
            let forms = res as AdmForm[];
            this.fuseProgresBar.hide();
            resolve(forms);
        }).
        catch(error => {
            this.fuseProgresBar.hide();
            this.utilService.openSnackBar('error al obtener listado de modulos')
            reject('error al obtener listado de modulos');
        });
    });
  }

  get_single_form(form_id): Promise<any> {
    return new Promise((resolve, reject) => {
        const url = `/rest/surveys/v1/${form_id}`
        this.fuseProgresBar.show();
        this.api.getMethod(url).then(formulario => {
            this.fuseProgresBar.hide();
            resolve (formulario as AdmForm)
        })
        .catch(error => {
            this.fuseProgresBar.hide();
            this.utilService.openSnackBar('Error al Obtener el formulario solicitado')
        })
    })
  }
  
  get_question_by_form(form_id :number): Promise<any>{
    return new Promise((resolve, reject) => {
        const url = `/rest/surveys/v1/${form_id}/questions`
        this.fuseProgresBar.show();
        this.api.getMethod(url).then(questions => {
            this.fuseProgresBar.hide();
            resolve (questions as AdmQuestionGroup[])
        })
        .catch(error => {
            this.fuseProgresBar.hide();
            this.utilService.openSnackBar('Error al Obtener los grupos y preguntas')
        })
    })
  }

  getCategories(id,params?): Promise<any> {
    const url = `/rest/modules/v1/${id}/categories`;
    //this.fuseProgresBar.show();
    return new Promise((resolve, reject) => {
        this.api.getMethod(url, params).then(res => {
            let categories = res as AdmCategory[];
            this.fuseProgresBar.hide();
            resolve(categories);
        }).
        catch(error => {
            //this.fuseProgresBar.hide();
            this.utilService.openSnackBar('error al obtener listado de categorias')
            reject('error al obtener listado de categorias');
        });
    });
  }

  submit_answers(form_id: number, answers: AdmAnswer[], isPublic = false) {
    return new Promise((resolve, reject) => {
        let _answers;
        this.fuseProgresBar.show();
        const url =   `/rest/answers/v1/form/${form_id}` 
        
        /*if (isPublic) {
            _answers =  answers.map( answer =>  { 
                delete answer.created_by_user
            })
        }
        else  {
            _answers =  answers
        }*/
        //console.log(answers);
        this.api.postMethod(url, answers).then(response => {
            this.fuseProgresBar.hide()
            this.utilService.openSnackBar('Boleta Enviada')
            resolve(true)
        })
        .catch(error => {
        
            this.fuseProgresBar.hide();
            this.utilService.openSnackBar('Ocurrió un problema al Guardar sus respuestas por favor intente más tarde')
            reject(error)
        })
        
    })
  }

  getSurveyRecords(form_id:number, params?){
    const url = `/rest/surveys/v1/${form_id}/info`;
    this.fuseProgresBar.show();
    return new Promise((resolve, reject) =>{
        this.api.getMethod(url,params).then(res =>{
            let survey = res as AdmSurveyRecords []
            this.fuseProgresBar.hide();
            resolve(survey);
        })
        .catch(error => {
            //this.fuseProgresBar.hide();
            this.utilService.openSnackBar('error al obtener listado de boletas registradas')
            reject('error al obtener listado de boletas registradas');
        });
    })
  }

  getSurveyStats(form_id: number): Promise<any> {
    return new Promise ((resolve, reject) => {
        const url = `/rest/surveys/v1/stats/${form_id}`;
        this.fuseProgresBar.show();
        this.api.getMethod(url)
            .then(data => { 
                this.fuseProgresBar.hide();
                resolve(data as FormModelStats)
            })

            .catch(error => {
                this.fuseProgresBar.hide();
                this.utilService.openSnackBar('Error al Obtener Datos para las estadisticas');
                reject(error);
            })
    
    })
  }

  transformDataToHigcharOptions(question: QuestionStats) {
    let chartOptions = 
    {
        title: {text: question.question_name},
        xAxis: {
            categories: this.get_chart_axis_categories(question.stats)
        },
        series: [
            {
                name: question.question_name,
                type: this.get_chart_type(question.question_type),
                data: this.get_series_chart(question.stats)
            }
        ]
    };

    return chartOptions;

  }

  get_chart_type(questionType) {
      return this.InputFormTypes.filter(type => type.value == questionType)[0].chart_type  
  } 

  get_series_chart(stats: Object) {
      return Object.keys(stats).map( key => {
        const name = key;  
        const y = stats[key];
        const color = this.random_hex_color_code();
        return {name, y, color};
      })
  }

  get_chart_axis_categories(stats: Object){
    return Object.keys(stats).map( key => {
        const name = key;  
        return name
      })
  }

  random_hex_color_code() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };

  downloadCSV(form) {
      const url = `rest/reports/v1/form/${form.form_id}`;
      const params = {}
      const type = 'xlsx'
      const fileName = `Respuestas-Formulario-${form.name_form}`
      return this.utilService.exportFile(url, {}, type, fileName )
  }

  getAnswers(form_id){
      const url =`/rest/surveys/v1/${form_id}/data`
      this.fuseProgresBar.show();
      return new Promise((resolve, reject)=>{
          this.api.getMethod(url).then(res=>{
              this.fuseProgresBar.hide()
              const answers = res as AdmSurveyAnswers;
              resolve(res)
          }).catch(error=>{
              this.fuseProgresBar.hide()
              this.utilService.openSnackBar('Error al obtener las respuestas')
              reject ('Error al obtener las respuestas')
          })
      })
  }

  updateStatusSurvey(survey_id){
      
      let survey: AdmUpdateStatusSurvey = new AdmUpdateStatusSurvey();
      survey.survey_id=survey_id;
      survey.status.typology_id=env.DEFAULT_STATUS_INACTIVE;

      const url = `/rest/surveys/v1/${survey_id}/update`
      this.fuseProgresBar.show()
      return new Promise((resolve, reject)=>{
          this.api.putMethod(url, survey).then(res =>{
            this.fuseProgresBar.hide()
            this.utilService.openSnackBar('Registro eliminado correctamente')
            resolve(res)
          }).catch(error=>{
              this.fuseProgresBar.hide()
              this.utilService.openSnackBar('Hubo un error al eliminar, intente de nuevo')
              reject('Hubo un error al eliminar, intente de nuevo')
          })
      })
  }

  updateSurveysStatus(survey: AdmUpdateStatusSurvey[]){
      
    const url = `/rest/surveys/v1/`
    this.fuseProgresBar.show()
    return new Promise((resolve, reject)=>{
        this.api.putMethod(url, survey).then(res =>{
          this.fuseProgresBar.hide()
          this.utilService.openSnackBar('Registros eliminados correctamente')
          resolve(res)
        }).catch(error=>{
            this.fuseProgresBar.hide()
            this.utilService.openSnackBar('Hubo un error al eliminar, intente de nuevo')
            reject('Hubo un error al eliminar, intente de nuevo')
        })
    })
  }
}
