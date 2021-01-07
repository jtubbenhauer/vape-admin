import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { InvoiceService } from 'app/data/service/invoice.service';
import { ActivatedRoute } from "@angular/router";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FlavoursService } from 'app/data/service/flavours.service';
import { map, startWith } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit, AfterViewInit {

  invoiceNum: string;
  invoiceDetails: any = {};
  invoiceItems: any[] = [];
  flavours: any[] = [];


  flavourList: [] = [];
  filteredOptions: Observable<any[]>;
  addProduct = new FormControl();

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['product', 'unit', 'qty', 'cost', 'total', 'received'];
  unitOptions: string[] = ['Millilitre', 'Litre', 'Ounce', '16 Ounce', 'Gallon'];


  constructor(private router: Router, private route: ActivatedRoute, private invoiceService: InvoiceService, private flavourService: FlavoursService) { }

  ngOnInit(): void {
    this.invoiceItems = [];
    this.invoiceNum = this.route.snapshot.paramMap.get('id');
    this.invoiceService.getInvoice(this.invoiceNum).valueChanges().subscribe(res => {
      this.invoiceDetails = res;
      this.getFlavours(this.invoiceDetails);
    });
    this.invoiceService.getInvoiceItems(this.invoiceNum).snapshotChanges().subscribe(res => {
      res.map(i => {
        let data = i.payload.doc.data();        
        this.invoiceItems.push({
          'id': i.payload.doc.id,
          'product': data['product'],
          'cost': data['cost'],
          'total': data['total'],
          'qty': data['qty'],
          'unit': data['unit'],
          'received': data['received']
        })
      });
      this.dataSource.data = this.invoiceItems; 
    });

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  displayFn(flavour): string {
    return flavour && flavour.name ? flavour.name : ''; 
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();    
    return this.flavours.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getFlavours(data) {
    this.flavourService.getFlavoursFromSupplier(data.supplier).snapshotChanges().subscribe(res => {
      res.map(i => {
        this.flavours.push({
          name: i.payload.doc.data()['name'],
          id: i.payload.doc.id
        })
      });
      
      this.filteredOptions = this.addProduct.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value: value.name),
        map(name => name ? this._filter(name) : this.flavours.slice())
      );    
    })
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
    this.invoiceService.updateInvoice(this.invoiceNum, this.dataSource.data);
    this.router.navigate(['admin/invoices'])
  }

  deleteHandler() {
    if(confirm('Are you sure?')) {
      this.invoiceService.deleteInvoice(this.invoiceNum);
    }
  }

  markReceived() {
    this.dataSource.data.map(i => {
      i['received'] = i['qty']
    })
  }

  receiveAndClose() {
    this.invoiceService.receiveStock(this.dataSource.data);
    this.invoiceService.closeInvoice(this.invoiceNum);
    this.router.navigate(['admin/invoices']);
  }

}
