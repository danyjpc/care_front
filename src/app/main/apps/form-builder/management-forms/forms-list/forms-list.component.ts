import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AdmForms } from '../../AdmForms';
import { FormBuilderService } from '../../form-builder.service';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss']
})
export class FormsListComponent implements OnInit {

  $destroy: Subject<any>;
  searchInput = new FormControl('');
  Formularios: AdmForms[]=[]

  FilterForms:  AdmForms[]=[];
  constructor(private formService: FormBuilderService, 
   ) {
    this.$destroy = new Subject();
   }

  ngOnInit(): void {
    this.get_forms();

    this.searchFunction();

    // fill forms every time form filter change
    this.formService.OnFormsListChange
        .pipe(takeUntil(this.$destroy))
        .subscribe(formularios => {
          this.FilterForms = [...formularios]
          this.Formularios =  formularios
        })
  }

  async get_forms(){
    this.Formularios  =  await this.formService.get_available_forms() as AdmForms[]
  }

  searchFunction(){
    this.searchInput.valueChanges
    .pipe(
        takeUntil(this.$destroy),
        debounceTime(300),
        distinctUntilChanged()
    )
    .subscribe(searchText => {
        // filter 
        if (searchText) {
            const filterdata = FuseUtils.filterArrayByString(this.FilterForms, searchText)
            this.Formularios = filterdata
        } 
        else {
          this.Formularios = this.FilterForms
        }

    });
  }
  
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();    
  }

}
