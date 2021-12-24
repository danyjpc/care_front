import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private _location: Location) { }

  ngOnInit(): void {
  }

  backClicked(){
    this.router.navigate(['module']);
  }
}
