import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './page/invoices.component';
import { SharedModule } from 'app/shared/shared.module';
import { InvoiceListComponent } from './page/invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceNewComponent } from './invoice-new/invoice-new.component';


@NgModule({
  declarations: [InvoicesComponent, InvoiceListComponent, InvoiceEditComponent, InvoiceNewComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule
  ]
})
export class InvoicesModule { }
