import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MixingRoutingModule } from './mixing-routing.module';
import { PageComponent } from './page.component';
import { MixingComponent } from './page/mixing.component';


@NgModule({
  declarations: [PageComponent, MixingComponent],
  imports: [
    CommonModule,
    MixingRoutingModule
  ]
})
export class MixingModule { }
