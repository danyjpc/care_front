import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-arrow-back',
  templateUrl: './arrow-back.component.html',
  styleUrls: ['./arrow-back.component.scss']
})
export class ArrowBackComponent implements OnInit {

  constructor(
    private _location: Location
  ) { }

  ngOnInit(): void {
  }
  
  backClicked(){
    this._location.back();
  }
}
