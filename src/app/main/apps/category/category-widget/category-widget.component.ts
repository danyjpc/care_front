import { Component, Input, OnInit } from '@angular/core';
import { AdmCategory } from '../AdmCategory';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-widget',
  templateUrl: './category-widget.component.html',
  styleUrls: ['./category-widget.component.scss']
})
export class CategoryWidgetComponent implements OnInit {
  @Input() categories: AdmCategory;
  module_id : number;
  
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.module_id = params.module_id;
      },
      error=>{
        console.log(error);
      }
    )
  }

  redirect(value){
    this.router.navigate(['survey/module',this.module_id,'category',value.category_id]);
  }

}
