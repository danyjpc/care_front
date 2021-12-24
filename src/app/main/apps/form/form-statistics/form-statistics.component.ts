import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from '../form.service';
import { AdmForm} from '../AdmForm';
import { Location } from '@angular/common';
import { FormModelStats } from '../form-stats-model';
import { AdmForms } from '../../form-builder/AdmForms';


@Component({
  selector: 'app-form-statistics',
  templateUrl: './form-statistics.component.html',
  styleUrls: ['./form-statistics.component.scss']
})
export class FormStatisticsComponent implements OnInit {

  form_id = 0;
  form : AdmForm = new AdmForm();

  FormStats: FormModelStats;

  constructor(
    private formService : FormService,
    private route: ActivatedRoute, private router: Router,
    private _location: Location
  )
  { 
    this.form_id = this.route.snapshot.params.form_id;
    this.FormStats = new FormModelStats();
  }

  ngOnInit(): void {
    this.getForm(this.form_id);
    this.get_stats(this.form_id);
  }

  async getForm(form_id){
    this.form = await this.formService.get_single_form(form_id);
    //console.log(this.form)
    
  }

  async get_stats(form_id) {
    this.FormStats = await this.formService.getSurveyStats(form_id) as FormModelStats
  }

  download_csv(){
    this.formService.downloadCSV(this.form)
  }

  backClicked(){
    this._location.back();
  }
}
