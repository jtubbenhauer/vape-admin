import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MixingRoutingModule } from './mixing-routing.module';
import { MixingComponent } from './page/mixing.component';
import { SharedModule } from 'app/shared/shared.module';
import { ConcentrateComponent } from './page/concentrate/concentrate.component';
import { ConcentrateTableComponent } from './page/concentrate/concentrate-table/concentrate-table.component';
import { RtvComponent } from './page/rtv/rtv.component';
import { DoublerComponent } from './page/doubler/doubler.component';


@NgModule({
  declarations: [MixingComponent, ConcentrateComponent, ConcentrateTableComponent, RtvComponent, DoublerComponent],
  imports: [
    CommonModule,
    MixingRoutingModule,
    SharedModule
  ]
})
export class MixingModule { }
