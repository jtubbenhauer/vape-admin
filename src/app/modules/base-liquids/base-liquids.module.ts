import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseLiquidsRoutingModule } from './base-liquids-routing.module';
import { BaseLiquidsComponent } from './page/base-liquids.component';
import { SharedModule } from 'app/shared/shared.module';

import { VgStockDialogComponent } from './dialogs/vg-stock-dialog/vg-stock-dialog.component';
import { PgStockDialogComponent } from './dialogs/pg-stock-dialog/pg-stock-dialog.component';
import { VgCostDialogComponent } from './dialogs/vg-cost-dialog/vg-cost-dialog.component';
import { PgCostDialogComponent } from './dialogs/pg-cost-dialog/pg-cost-dialog.component';


@NgModule({
  declarations: [BaseLiquidsComponent, VgStockDialogComponent, PgStockDialogComponent, VgCostDialogComponent, PgCostDialogComponent],
  imports: [
    CommonModule,
    BaseLiquidsRoutingModule,
    SharedModule
  ],
  entryComponents: [
    VgStockDialogComponent,
    PgStockDialogComponent,
    VgCostDialogComponent,
    PgCostDialogComponent
  ]
})
export class BaseLiquidsModule { }
