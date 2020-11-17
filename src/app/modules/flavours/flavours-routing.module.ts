import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlavoursDetailComponent } from './flavours-detail/flavours-detail.component';
import { FlavoursComponent } from './page/flavours.component';

const routes: Routes = [{
  path: '',
  component: FlavoursComponent
}, {
  path: ':id',
  component: FlavoursDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlavoursRoutingModule { }
