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

  newQty: number;
  index: number;

  count:number = 0;

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

    this.dataSource.sort = this.sort;
  }

  getSuppliers() {
    this.flavourService.getSuppliers().subscribe(res => {
      res.map(i => {
        this.supplierOptions.push(i['name'])
      })
    })
  }

  saveClick(flavour) {
    
    let id = flavour['id'];
    let data = {
      'stock': +flavour['newQty'],
      'unit': flavour['newUnit']
    } 
    
    let delId = this.dataSource.data.findIndex(i => i['id'] == id)
    
    this.flavourService.updateFlavour(id, data);
    this.flavours.splice(delId, 1);
    this.dataSource.data = this.flavours

 
  }

  newStocktakeButton() {    
    this.count = 0;
    this.flavours = [];
    let supplier = this.supplier.value;

    this.flavourService.getFlavoursFromSupplier(supplier).snapshotChanges().subscribe(res => {
      if (this.count === 0) {
        res.map(i => {
          this.flavours.push({
            'name': i.payload.doc.data()['name'],
            'id': i.payload.doc.id,
            'stock': i.payload.doc.data()['stock'],
            'unit':i.payload.doc.data()['unit'],
            'newUnit':i.payload.doc.data()['unit'],
            'newQty':0
          });
          
        })
        this.dataSource.data = this.flavours;
        this.count++;
      }
    });
    };
    
    

  }



