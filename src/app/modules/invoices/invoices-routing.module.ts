import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceNewComponent } from './invoice-new/invoice-new.component';
import { InvoicesComponent } from './page/invoices.component';

const routes: Routes = [{
  path: '',
  component: InvoicesComponent
}, {
  path: 'new',
  component: InvoiceNewComponent
}, {
  path: ':id',
  component: InvoiceEditComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
