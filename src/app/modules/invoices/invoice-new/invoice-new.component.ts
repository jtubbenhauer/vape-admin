import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FlavoursService } from 'app/data/service/flavours.service';
import { InvoiceService } from 'app/data/service/invoice.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.css']
})
export class InvoiceNewComponent implements OnInit {

  supplierOptions: string[] = [];
  filteredOptions: Observable<any[]>;
  flavourList:any [] = [];

  supplier = new FormControl('');
  addProduct = new FormControl('')
  invoicenum = new FormControl('')
  date = new FormControl(new Date())

  constructor(private invoiceService: InvoiceService, private flavourService: FlavoursService) { }

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers() {
    this.flavourService.getSuppliers().subscribe(res => {
      res.map(i => {
        this.supplierOptions.push(i['name'])
      })
    })
  }

  supplierChange(value) {
    let flavours = new Array();
    this.flavourService.getFlavoursFromSupplier(value).snapshotChanges().subscribe(res => {
      res.map(i => {
        flavours.push({
          'name': i.payload.doc.data()['name'],
          'id': i.payload.doc.id
        })
      });
      this.filteredOptions = this.addProduct.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value: value.name),
            map(name => name ? this._filter(name) : flavours.slice())
          )
    })
  };

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.flavourList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
