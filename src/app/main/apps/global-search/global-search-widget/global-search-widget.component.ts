import { Component, Input, OnInit } from '@angular/core';
import { AdmRecords } from '../AdmGlobalSearch';

@Component({
  selector: 'app-global-search-widget',
  templateUrl: './global-search-widget.component.html',
  styleUrls: ['./global-search-widget.component.scss']
})
export class GlobalSearchWidgetComponent implements OnInit {

  @Input() record : AdmRecords;

  constructor() { }

  ngOnInit(): void {
  }

}
