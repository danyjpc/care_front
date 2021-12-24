import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  module_id : 0;

  constructor(
    private formService : FormService,
    private route: ActivatedRoute, private router: Router) 
  {
    this.module_id = this.route.snapshot.params.module_id;
  }

  ngOnInit(): void {
  }

  backClicked(){
    this.formService.getCategories(this.module_id).then(
      data =>{
        if(data.length <=1){
          this.router.navigate(['module']);
        }else{
          this.router.navigate(['module/v1',this.module_id,'categories']);
        }
      }
    )
  }

}
