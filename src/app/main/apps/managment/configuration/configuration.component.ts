import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from './configuration.service';
import { AdmConfiguration } from './AdmConfiguration';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  configs : AdmConfiguration [] = []

  constructor(
    private configService :ConfigurationService,
  ) { }

  ngOnInit(): void {
    this.getConfiguration();
  }

  async getConfiguration(){
    this.configs = await this.configService.getConfig() as AdmConfiguration [];
    //console.log(this.configs);
  }

  updateConfig(){
    this.configService.updateConfig(this.configs);
  }
}
