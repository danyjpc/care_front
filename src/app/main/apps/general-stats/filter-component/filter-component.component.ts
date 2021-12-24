import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmTypology, TypologyId } from 'app/shared/adm-models/AdmTypology';
import { AdmModule } from '../../managment/modulescategories/AdmModulesCategories';
import { ModulescategoriesService } from '../../managment/modulescategories/modulescategories.service';
import {FilterStatsParams} from '../filter-component/filter-params-interface'
import { environment as env } from 'environments/environment';
import { StatsService } from '../stats-service';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss']
})
export class FilterComponentComponent implements OnInit {
  filterParams: FilterStatsParams;
  modules: AdmModule[]=[]
  states: AdmTypology;

  constructor(
    private moduleService: ModulescategoriesService,
    private utils: UtilsService,
    private statsService: StatsService
  ) 
  { 
    this.filterParams = new FilterStatsParams();
    this.states = new AdmTypology();
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.modules = await this.moduleService.getModules();
    this.states = await this.utils.getTypology(env.DEFAULT_PAIS_TYPOLOGY) as AdmTypology;
  }

  filter(){
    this.statsService.getStats(this.filterParams)
  }
}
