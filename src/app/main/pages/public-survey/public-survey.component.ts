import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'app/main/apps/form/form.service';
import { AdmForm } from 'app/main/apps/form/AdmForm';
import { FuseConfigService } from '../../../../@fuse/services/config.service';

@Component({
  selector: 'app-public-survey',
  templateUrl: './public-survey.component.html',
  styleUrls: ['./public-survey.component.scss']
})
export class PublicSurveyComponent implements OnInit {
  form_id: 0;
  form: AdmForm = new AdmForm()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private _fuseConfigService: FuseConfigService
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
    this.form_id = this.route.snapshot.params.form_id;
    this.getForm(this.form_id);
  }

  ngOnInit(): void {

  }
  async getForm(form_id) {
    this.form = await this.formService.get_single_form(form_id) as AdmForm;
  }


}
