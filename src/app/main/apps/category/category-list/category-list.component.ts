import { Component, OnInit } from '@angular/core';
import { AdmCategory } from '../AdmCategory'
import { CategoryService} from '../category.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories : AdmCategory [] = [];
  module_id : 0; 

  constructor(private categoryService : CategoryService,
      private route: ActivatedRoute, private router: Router
  ) 
  {
    this.module_id = this.route.snapshot.params.module_id;
    this.ListarCategorias(this.module_id);
  }

  ngOnInit(): void {
    //this.ListarCategorias(this.module_id); 
  }

  ListarCategorias(module_id){
    this.categoryService.getCategories(module_id).then(
      data =>{
        this.categories = data;
        //Redirige a formularios si solo hay una categoria 
        if(this.categories.length <=1){
          this.router.navigate(['survey/module',module_id,'category', this.categories[0].category_id]);
        }

      }
    )
  }

}
