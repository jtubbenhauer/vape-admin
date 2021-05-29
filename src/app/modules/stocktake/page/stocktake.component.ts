import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FlavoursService } from 'app/data/service/flavours.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stocktake',
  templateUrl: './stocktake.component.html',
  styleUrls: ['./stocktake.component.css']
})
export class StocktakeComponent implements OnInit {

  supplierOptions: string[] = [];
  flavours: any[] = [];
  filteredOptions: Observable<any[]>;

  supplier = new FormControl('');

  constructor(private flavourService: FlavoursService) { }

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
    this.flavours = [];
    this.flavourService.getFlavoursFromSupplier(value).snapshotChanges().subscribe(res => {
      res.map(i => {
        console.log(i.payload.doc.data())
        this.flavours.push({
          'name': i.payload.doc.data()['name'],
          'id': i.payload.doc.id
        });
      });
    })
  }

}
