import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MixingRoutingModule } from './mixing-routing.module';
import { MixingComponent } from './page/mixing.component';
import { SharedModule } from 'app/shared/shared.module';
import { ConcentrateComponent } from './page/concentrate/concentrate.component';
import { ConcentrateTableComponent } from './page/concentrate/concentrate-table/concentrate-table.component';


@NgModule({
  declarations: [MixingComponent, ConcentrateComponent, ConcentrateTableComponent],
  imports: [
    CommonModule,
    MixingRoutingModule,
    SharedModule
  ]
})
export class MixingModule { }
