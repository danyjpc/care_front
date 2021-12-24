import { Component, OnInit } from '@angular/core';
import { AdmModule } from '../../AdmModulesCategories'
import { ModulescategoriesService } from '../../modulescategories.service'
import { MatDialog } from '@angular/material/dialog';
import { MangModulesFormComponent } from '../mang-modules-form/mang-modules-form.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogComponent } from 'app/shared/utils-components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-mang-modules-list',
  templateUrl: './mang-modules-list.component.html',
  styleUrls: ['./mang-modules-list.component.scss']
})
export class MangModulesListComponent implements OnInit {

  $destroy: Subject<any>;
  modules: AdmModule[] = [];
  displayedColumns: string[] = ['edit', 'id', 'module', 'ver'];

  constructor(private modulecategoryService: ModulescategoriesService,
    private dialog: MatDialog,
    private router: Router
  ) 
  { 
    this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.get_modules();
  }

  async get_modules(){
    this.modules = await this.modulecategoryService.getModules() as AdmModule[];
  }

  open_dialog_new() {
    const dialogRef = this.dialog.open(MangModulesFormComponent, {
      width: '500px',
    })
    //espera a que el dialog cierre
    dialogRef.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe (async(module: AdmModule) => {
        if (module) {
          await this.modulecategoryService.create_new_module(module);
          this.ngOnInit();
        }
      })
  }

  open_dialog_edit(module: AdmModule) {
    const dialogRef = this.dialog.open(MangModulesFormComponent, {
      width: '500px',
      data: {
        module
      }
    })
    //espera a que el dialog cierre
    dialogRef.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(async(module: AdmModule) => {
        if (module) {
          await this.modulecategoryService.update_module(module);
          this.ngOnInit();
        }
      })
  }

  openDeleteConfirm(module: AdmModule){
    const alertDialog = this.dialog.open(AlertDialogComponent,{

    })
    alertDialog.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(async(bool: boolean) =>{
        if(bool){
          module.status.typology_id=160447;
          await this.modulecategoryService.update_module(module);
          this.router.navigate(['managment/modules-categories']);
          //this.ngOnInit();
        }
      })
  }

  //detiene los subscribe, junto con el takeUntil
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  redirect(value){
    this.router.navigate(['managment/modules-categories/module',value.module_id]);
  }
}
