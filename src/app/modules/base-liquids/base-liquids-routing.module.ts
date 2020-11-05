import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLiquidsComponent } from './page/base-liquids.component';

const routes: Routes = [{
  path: '',
  component: BaseLiquidsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseLiquidsRoutingModule { }
