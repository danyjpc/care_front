import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdmForm } from '../AdmForm';
import { Location } from '@angular/common';



@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.scss']
})
export class ShowFormComponent implements OnInit {

  form_id : 0;
  form : AdmForm = new AdmForm();
  show :string;

  constructor(
    private formService : FormService,
    private route: ActivatedRoute, private router: Router,
    private _location: Location
  ) 
  { 
    this.form_id = this.route.snapshot.params.form_id;
    this.show = this.route.snapshot.params.show;
  }

  ngOnInit(): void {
    this.get_form(this.form_id);
  }
  
  async get_form(value){
    this.form = await this.formService.get_single_form(value);
  }

  backClicked(){
    //this.router.navigate(['survey/module',this.form.module.module_id,'category',this.form.category.category_id]);
    this._location.back();
  }

}
