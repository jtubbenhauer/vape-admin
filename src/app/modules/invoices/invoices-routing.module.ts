import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceNewComponent } from './invoice-new/invoice-new.component';
import { InvoicesComponent } from './page/invoices.component';

const routes: Routes = [{
  path: '',
  component: InvoicesComponent
}, {
  path: 'new',
  component: InvoiceNewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
