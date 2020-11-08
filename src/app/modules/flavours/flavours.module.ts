import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlavoursRoutingModule } from './flavours-routing.module';
import { FlavoursComponent } from './page/flavours.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [FlavoursComponent],
  imports: [
    CommonModule,
    FlavoursRoutingModule,
    SharedModule
  ]
})
export class FlavoursModule { }
