import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmForms } from '../AdmForms';
import { FormBuilderService } from '../form-builder.service';

@Component({
  selector: 'app-builder-v2',
  templateUrl: './builder-v2.component.html',
  styleUrls: ['./builder-v2.component.scss']
})
export class BuilderV2Component implements OnInit {


  formulario: AdmForms;
  form_id: number;

  constructor(
    private formService: FormBuilderService,
    private route : ActivatedRoute,
    private router: Router
  ) 
  {
      this.form_id = (this.route.snapshot.params.form_id) ? this.route.snapshot.params.form_id : 0
      this.formulario = new AdmForms();
  }

  ngOnInit(): void {
    this.get_active_Form();
  }

  async get_active_Form(){
    this.formulario =  await this.formService.get_single_form(this.form_id);
  }

  showForm(){
    this.router.navigate(['survey/v1',this.form_id,'questions','false']);
  }

}
