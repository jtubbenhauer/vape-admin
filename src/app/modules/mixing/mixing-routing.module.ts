import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MixingComponent } from './page/mixing.component';

const routes: Routes = [{
  path: '',
  component: MixingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MixingRoutingModule { }
