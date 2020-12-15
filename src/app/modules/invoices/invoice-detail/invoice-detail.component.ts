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
      this.getInvoiceDetails(id);
      this.getInvoiceItems(id);
    }
  }

  getInvoiceDetails(id: string) {
    
    this.service.getInvoice(id).valueChanges().subscribe(res => { 
      
      this.date.setValue(res['date'].toDate());
      this.supplier.setValue(res['supplier']);

      this.supplierChange(res['supplier']);
    
    });
  }

  getInvoiceItems(id: string) {
    let invoiceItems: any[] = [];
    this.service.getInvoiceItems(id).snapshotChanges().subscribe(res => {
      res.map(i => {
        let data = i.payload.doc.data();
        
        invoiceItems.push({
          'id': i.payload.doc.id,
          'product': data['product'],
          'qty': data['qty'],
          'cost': data['cost'],
          'total': data['total'],
          'unit': data['unit']
        })
      });
      this.dataSource.data = invoiceItems;
    })
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
      let newProduct = {
        'product': res['name'],
        'unit': res['unit'],
        'cost': res['cost'],
        'qty': 0,
        'total': '0',
        'id': this.addProduct.value.id
      }
      let data = this.dataSource.data;
      data.push(newProduct);
      this.dataSource.data = data;
    });
  }

  saveInvoiceButton() {
    
    if (this.id === 'new') {
      let invoiceDetails = {
        'invoice': this.invoicenum.value,
        'supplier': this.supplier.value,
        'date': this.date.value,
        'status': 'Open'
      }
      this.service.incrementInvoiceCount();
      this.service.saveNewInvoice(invoiceDetails, this.dataSource.data);
      } else {
        
        let invoiceDetails = {
          'invoice': this.invoicenum.value,
          'supplier': this.supplier.value,
          'date': this.date.value,
          'status': 'Open'
        }
        
        // this.service.saveInvoice(invoiceDetails, this.dataSource.data)
      }  
    } 



  }
    
