import { Component, OnInit } from '@angular/core';
import { FormService } from '../../form.service';
import { AdmSurveyRecords } from '../../AdmForm';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'app/core/services/utils.service';

@Component({
  selector: 'app-form-statistics-list',
  templateUrl: './form-statistics-list.component.html',
  styleUrls: ['./form-statistics-list.component.scss']
})
export class FormStatisticsListComponent implements OnInit {

  ListSurveys : AdmSurveyRecords[] = [];
  displayedColumns: string[] = [ 'id', 'nombre', 'fecha', 'departamento', 'municipio'];
  form_id = 0;

  constructor(
    private formService : FormService,
    private route: ActivatedRoute, private router: Router,
    private utilService: UtilsService,
  ) 
  { 
    this.form_id = this.route.snapshot.params.form_id;
  }

  ngOnInit(): void {
    this.ListSurveysRecors(this.form_id);
  }

  async ListSurveysRecors(form_id){
    this.ListSurveys = await this.formService.getSurveyRecords(form_id) as AdmSurveyRecords [];
    console.log(this.ListSurveys)
  }
}
