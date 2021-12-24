import { Component, OnInit } from '@angular/core';
import { FormService } from '../../form.service';
import { AdmForm } from '../../AdmForm';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-statistics-answers',
  templateUrl: './form-statistics-answers.component.html',
  styleUrls: ['./form-statistics-answers.component.scss']
})
export class FormStatisticsAnswersComponent implements OnInit {

  form_id = 0;
  form : AdmForm = new AdmForm();

  constructor(private formService : FormService,
    private route: ActivatedRoute, private router: Router,)
    {
      this.form_id = this.route.snapshot.params.form_id

    }

  ngOnInit(): void {
    this.getForm();
  }

  async getForm(){
    this.form = await this.formService.get_single_form(this.form_id) as AdmForm
  }

  download_csv(){
    this.formService.downloadCSV(this.form)
  }
}
