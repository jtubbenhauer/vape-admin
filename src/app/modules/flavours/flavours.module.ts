import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlavoursRoutingModule } from './flavours-routing.module';
import { FlavoursComponent } from './page/flavours.component';
import { SharedModule } from 'app/shared/shared.module';
import { FlavoursTableComponent } from './page/flavours-table/flavours-table.component';
import { AddFlavourDialogComponent } from './page/add-flavour-dialog/add-flavour-dialog.component';


@NgModule({
  declarations: [FlavoursComponent, FlavoursTableComponent, AddFlavourDialogComponent],
  imports: [
    CommonModule,
    FlavoursRoutingModule,
    SharedModule
  ],
  entryComponents: [
    AddFlavourDialogComponent
  ]
})
export class FlavoursModule { }
