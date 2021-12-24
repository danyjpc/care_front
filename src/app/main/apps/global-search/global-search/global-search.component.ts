import { Component, OnInit } from '@angular/core';
import { GlobalSearchService } from '../global-search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdmGlobalSearch} from '../AdmGlobalSearch';
import { UtilsService } from 'app/core/services/utils.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit {

  searchTerm = "";
  searchData : AdmGlobalSearch = new AdmGlobalSearch()

  constructor(
    private route : ActivatedRoute,
    private searchService : GlobalSearchService,
    private utilService: UtilsService,
    private _location: Location
  ){ }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.searchTerm =params.searchString
      if(this.searchTerm.length == 0){
        
      }else{
        this.getRecords(this.searchTerm);
      }
    })
  }

  getRecords(searchTerm){
    const params = { searchTerm } ;
      this.searchService.getSearch(params).then(data =>{
        this.searchData = data;
        console.log(this.searchData)
      });
  }

  backClicked(){
    this._location.back();
  }

}
