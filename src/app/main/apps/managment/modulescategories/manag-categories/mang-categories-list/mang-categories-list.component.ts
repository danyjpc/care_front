import { Component, OnInit } from '@angular/core';
import { AdmCategory } from '../../AdmModulesCategories';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulescategoriesService } from '../../modulescategories.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MangCategoriesFormComponent } from '../mang-categories-form/mang-categories-form.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AlertDialogComponent } from 'app/shared/utils-components/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-mang-categories-list',
  templateUrl: './mang-categories-list.component.html',
  styleUrls: ['./mang-categories-list.component.scss']
})
export class MangCategoriesListComponent implements OnInit {

  categories : AdmCategory []= [];
  module_id : number = 0;
  displayedColumns: string[] = ['id', 'category', 'edit'];
  message =true;
  $destroy: Subject<any>;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private mcService : ModulescategoriesService,
    private dialog: MatDialog,
    private fuseProgresBar: FuseProgressBarService
  ) 
  { 
    this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.module_id = params.module_id;
        this.getCategories(this.module_id);
      },err =>{console.log(err)}
    )
  }

  async getCategories(module_id){
    if(module_id!=undefined){
      this.message=false;
      this.categories = await this.mcService.getCategories(module_id) as AdmCategory[];
    }else{
      this.message=true;
    }
    
  }

  open_dialog_new() {
    const dialogRef = this.dialog.open(MangCategoriesFormComponent , {
      width: '500px',
    })
    //espera a que el dialog cierre
    dialogRef.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe (async(category: AdmCategory) => {
        if (category) {
          await this.mcService.create_new_category(this.module_id,category);
          this.ngOnInit();
        }
      })
  }

  open_dialog_edit(category: AdmCategory) {
    const dialogRef = this.dialog.open(MangCategoriesFormComponent, {
      width: '500px',
      data: {
        category
      }
    })
    //espera a que el dialog cierre
    dialogRef.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(async(category: AdmCategory) => {
        if (category) {
          await this.mcService.update_category(this.module_id, category);
          this.ngOnInit();
        }
      })
  }

  openDeleteConfirm(category : AdmCategory){
    const alertDialog = this.dialog.open(AlertDialogComponent,{

    })
    alertDialog.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(async(bool: boolean) =>{
        if(bool){
          console.log("Entro al metodo delete")
          category.status.typology_id=160447;
          await this.mcService.update_category(this.module_id, category);
          this.ngOnInit();
        }
      })
  }

  //detiene los subscribe, junto con el takeUntil
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
