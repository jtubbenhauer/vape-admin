import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FlavoursService } from 'app/data/service/flavours.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stocktake',
  templateUrl: './stocktake.component.html',
  styleUrls: ['./stocktake.component.css']
})
export class StocktakeComponent implements OnInit, AfterViewInit {

  supplierOptions: string[] = [];
  flavours: any[] = [];
  filteredOptions: Observable<any[]>;

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'unit', 'qty', 'newUnit', 'newQty', 'save'];
  unitOptions: string[] = ['Millilitre', 'Litre', 'Ounce', '16 Ounce', 'Gallon']

  supplier = new FormControl('');

  constructor(private flavourService: FlavoursService) { }

  ngOnInit(): void {
    this.getSuppliers();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.sort = this.sort;
  }

  getSuppliers() {
    this.flavourService.getSuppliers().subscribe(res => {
      res.map(i => {
        this.supplierOptions.push(i['name'])
      })
    })
  }

  newStocktakeButton() {
    let supplier = this.supplier.value;
    this.flavours = [];
    this.flavourService.getFlavoursFromSupplier(supplier).snapshotChanges().subscribe(res => {
      res.map(i => {
        console.log(i.payload.doc.data())
        this.flavours.push({
          'name': i.payload.doc.data()['name'],
          'id': i.payload.doc.id,
          'stock': i.payload.doc.data()['stock'],
          'unit':i.payload.doc.data()['unit']
        });
      });
      this.dataSource.data = this.flavours;
    })
  }

  /*supplierChange(value) {
    this.flavours = [];
    this.flavourService.getFlavoursFromSupplier(value).snapshotChanges().subscribe(res => {
      res.map(i => {
        console.log(i.payload.doc.data())
        this.flavours.push({
          'name': i.payload.doc.data()['name'],
          'id': i.payload.doc.id
        });
      });
      this.dataSource.data = this.flavours;
    })
  } */

}
