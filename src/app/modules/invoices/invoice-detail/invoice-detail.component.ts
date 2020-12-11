import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FlavoursService } from 'app/data/service/flavours.service';
import { InvoiceService } from 'app/data/service/invoice.service';

export interface Flavour {
  name: string;
  id: string;
}


@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  id: string;
  invoice: string;
  suppliers: string[] = [];
  flavourList: Flavour[] = [];
  filteredOptions: Observable<Flavour[]>;


  invoicenum = new FormControl('')
  supplier = new FormControl('')
  date = new FormControl(new Date())
  addProduct = new FormControl('')

  constructor(private route: ActivatedRoute, private service: InvoiceService, private flavourService: FlavoursService) { }

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
    this.flavourService.getFlavoursFromSupplier(value).snapshotChanges().subscribe(res => {
      res.map(i => {
        console.log(i.payload.doc.data()['name']);
        console.log(i.payload.doc.id);
        
      })
      
    })

    // this.flavourService.getFlavours().subscribe(item => {
    //   item.map(i => {        
    //     this.flavourList.push({
    //       'name': i['supplier'] + ' - ' + i['name'],
    //       'id': i['id']
    //     });
    //   });
    //   this.filteredOptions = this.addProduct.valueChanges.pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value: value.name),
    //     map(name => name ? this._filter(name) : this.flavourList.slice())
    //   )
    // })
  }

}
