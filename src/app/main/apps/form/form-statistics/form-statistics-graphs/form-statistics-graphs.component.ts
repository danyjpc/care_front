import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormModelStats } from '../../form-stats-model';
import { FormService } from '../../form.service';

@Component({
  selector: 'app-form-statistics-graphs',
  templateUrl: './form-statistics-graphs.component.html',
  styleUrls: ['./form-statistics-graphs.component.scss']
})
export class FormStatisticsGraphsComponent implements OnInit {
  form_id = 0;
  FormStats: FormModelStats[]=[];

  constructor(
    private formService : FormService,
    private route: ActivatedRoute, 
    private router: Router,
  ) 
  { 
    this.form_id = this.route.snapshot.params.form_id;
    
  }

  ngOnInit(): void {

  }




}
