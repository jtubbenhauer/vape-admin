import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FlavoursService } from 'app/data/service/flavours.service';
import { InvoiceService } from 'app/data/service/invoice.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.css']
})
export class InvoiceNewComponent implements OnInit, AfterViewInit {

  supplierOptions: string[] = [];
  filteredOptions: Observable<any[]>;
  flavourList:any [] = [];
  flavours: any[] = [];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['product', 'unit', 'qty', 'cost', 'total']
  unitOptions: string[] = ['Millilitre', 'Litre', 'Ounce', '16 Ounce', 'Gallon']

  supplier = new FormControl('');
  addProduct = new FormControl('')
  invoicenum = new FormControl('')
  date = new FormControl(new Date())

  constructor(private invoiceService: InvoiceService, private flavourService: FlavoursService) { }

  ngOnInit(): void {
    this.getSuppliers();
    this.invoiceService.getInvoiceNo().subscribe(res => {
      if (res) {
        this.invoicenum.setValue((res['count'] + 1).toString().padStart(6, '0'));      
      } else {
        this.invoiceService.initInvoiceCount();
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getSuppliers() {
    this.flavourService.getSuppliers().subscribe(res => {
      res.map(i => {
        this.supplierOptions.push(i['name'])
      })
    })
  }

  supplierChange(value) {
    this.flavourService.getFlavoursFromSupplier(value).snapshotChanges().subscribe(res => {
      res.map(i => {
        this.flavours.push({
          'name': i.payload.doc.data()['name'],
          'id': i.payload.doc.id
        })
      });
      this.filteredOptions = this.addProduct.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value: value.name),
            map(name => name ? this._filter(name) : this.flavours.slice())
          )
    })
  };

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.flavours.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(flavour): string {
    return flavour && flavour.name ? flavour.name : ''; 
  }

  addProductHandler() {
    this.flavourService.getFlavourFromID(this.addProduct.value.id).subscribe(res => {
      let newProduct = {
        'product': res['name'],
        'unit': res['unit'],
        'cost': res['cost'],
        'qty': 0,
        'total': '0',
        'id': this.addProduct.value.id,
        'received': 0
      }
      let data = this.dataSource.data;
      data.push(newProduct);
      this.dataSource.data = data;
    });
  }

  saveInvoiceButton() {
    let invoiceDetails = {
      'invoice': this.invoicenum.value,
      'supplier': this.supplier.value,
      'date': this.date.value,
      'status': 'Open'
    };
    this.invoiceService.incrementInvoiceCount();
    this.invoiceService.saveNewInvoice(invoiceDetails, this.dataSource.data)
  }

}
