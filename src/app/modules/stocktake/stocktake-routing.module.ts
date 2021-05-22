import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocktakeComponent } from './page/stocktake.component';

const routes: Routes = [{
  path: '',
  component: StocktakeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocktakeRoutingModule { }
