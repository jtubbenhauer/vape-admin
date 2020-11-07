import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseLiquidsRoutingModule } from './base-liquids-routing.module';
import { BaseLiquidsComponent } from './page/base-liquids.component';
import { SharedModule } from 'app/shared/shared.module';
import { VgStockDialogComponent } from './dialogs/vg-stock-dialog/vg-stock-dialog.component';


@NgModule({
  declarations: [BaseLiquidsComponent, VgStockDialogComponent],
  imports: [
    CommonModule,
    BaseLiquidsRoutingModule,
    SharedModule
  ]
})
export class BaseLiquidsModule { }
