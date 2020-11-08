import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlavoursComponent } from './page/flavours.component';

const routes: Routes = [{
  path: '',
  component: FlavoursComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlavoursRoutingModule { }
