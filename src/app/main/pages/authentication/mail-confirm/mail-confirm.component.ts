import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FuseConfigService } from '../../../../../@fuse/services/config.service';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { ConfigurationService } from '../../../apps/managment/configuration/configuration.service';
import { AdmConfiguration } from '../../../apps/managment/configuration/AdmConfiguration';


@Component({
  selector: 'app-mail-confirm',
  templateUrl: './mail-confirm.component.html',
  styleUrls: ['./mail-confirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class MailConfirmComponent implements OnInit {

  admConfigs : AdmConfiguration [] = [];


  constructor(
    private _fuseConfigService: FuseConfigService,
    private configService: ConfigurationService
  ) {
    this.getConfigs();
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
          navbar   : {
              hidden: true
          },
          toolbar  : {
              hidden: true
          },
          footer   : {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
  };
   }

  ngOnInit(): void {
  }

  async getConfigs(){
    this.admConfigs = await this.configService.getConfig() as AdmConfiguration [];

  }
}
