import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './page/invoices.component';
import { SharedModule } from 'app/shared/shared.module';
import { InvoiceListComponent } from './page/invoice-list/invoice-list.component';


@NgModule({
  declarations: [InvoicesComponent, InvoiceListComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule
  ]
})
export class InvoicesModule { }
