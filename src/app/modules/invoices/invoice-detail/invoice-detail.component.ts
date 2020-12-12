import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FlavoursService } from 'app/data/service/flavours.service';
import { InvoiceService } from 'app/data/service/invoice.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Flavour {
  name: string;
  id: string;
}


@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit, AfterViewInit {

  id: string;
  invoice: string;
  suppliers: string[] = [];
  flavourList: Flavour[] = [];
  filteredOptions: Observable<Flavour[]>;
  productList: any[] = [];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['product', 'unit', 'qty', 'cost', 'total']
  unitOptions: string[] = ['Millilitre', 'Litre', 'Ounce', '16 Ounce', 'Gallon']


  productQtys: any = {};

  invoicenum = new FormControl('')
  supplier = new FormControl('')
  date = new FormControl(new Date())
  addProduct = new FormControl('')

  constructor(private route: ActivatedRoute, private service: InvoiceService, private flavourService: FlavoursService) { }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.initInvoiceNum(this.id);

    this.getSuppliers();
  };

  displayFn(flavour: Flavour): string {
    return flavour && flavour.name ? flavour.name : ''; 
  }

  private _filter(name: string): Flavour[] {
    const filterValue = name.toLowerCase();
    return this.flavourList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  initInvoiceNum(id: string) {
    if (this.id === 'new') {
      this.service.getInvoiceNo().subscribe(res => {
        if (res) {
          this.invoicenum.setValue((res['count'] + 1).toString().padStart(6, '0'));      
        } else {
          this.service.initInvoiceCount();
        }
      });
    } else {
      this.invoicenum.setValue(id);
    }
  }

  getSuppliers() {
    this.flavourService.getSuppliers().subscribe(res => {
      res.map(i => {
        this.suppliers.push(i['name'])
      })
    })
  };

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

  addProductHandler() {
    this.flavourService.getFlavourFromID(this.addProduct.value.id).subscribe(res => {
      this.productList.push({
        'product': res['name'],
        'unit': res['unit'],
        'cost': res['cost'],
        'qty': 0,
        'total': '0',
        'id': this.addProduct.value.id
      })
      this.dataSource.data = this.productList;
    });
  }

  formFieldChange() {
    console.log(this.dataSource.data);
    
  }
}
