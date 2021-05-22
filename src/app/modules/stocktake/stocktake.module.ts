import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { StocktakeRoutingModule } from './stocktake-routing.module';
import { StocktakeComponent } from './page/stocktake.component';


@NgModule({
  declarations: [StocktakeComponent],
  imports: [
    CommonModule,
    StocktakeRoutingModule,
    SharedModule
  ]
})
export class StocktakeModule { }
