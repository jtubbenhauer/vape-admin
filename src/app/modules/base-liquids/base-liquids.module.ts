import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseLiquidsRoutingModule } from './base-liquids-routing.module';
import { BaseLiquidsComponent } from './page/base-liquids.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [BaseLiquidsComponent],
  imports: [
    CommonModule,
    BaseLiquidsRoutingModule,
    SharedModule
  ]
})
export class BaseLiquidsModule { }
