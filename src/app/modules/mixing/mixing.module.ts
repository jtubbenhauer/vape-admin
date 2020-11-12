import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MixingRoutingModule } from './mixing-routing.module';
import { MixingComponent } from './page/mixing.component';


@NgModule({
  declarations: [MixingComponent],
  imports: [
    CommonModule,
    MixingRoutingModule
  ]
})
export class MixingModule { }
