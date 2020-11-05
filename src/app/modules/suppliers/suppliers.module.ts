import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { SuppliersComponent } from './page/suppliers.component';
import { SuppliersListComponent } from './page/suppliers-list/suppliers-list.component';
import { AddSupplierDialogComponent } from './page/add-supplier-dialog/add-supplier-dialog.component';



@NgModule({
  declarations: [SuppliersComponent, SuppliersListComponent, AddSupplierDialogComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    SharedModule
  ],
  entryComponents: [
    AddSupplierDialogComponent
  ]
})
export class SuppliersModule { }
