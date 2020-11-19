import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MixingConcentrateService } from 'app/data/service/mixing-concentrate.service';

@Component({
  selector: 'app-concentrate-table',
  templateUrl: './concentrate-table.component.html',
  styleUrls: ['./concentrate-table.component.css']
})
export class ConcentrateTableComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['supplier', 'name', 'percentage', 'quantity', 'on_hand'];
  dataSource = new MatTableDataSource();

  newStock: number;
  flavourID: string;

  updateStock: any = [];


  @Input('recipe') recipeData: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: MixingConcentrateService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(changes.recipeData.currentValue)
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  commitBatch() {

    if(this.dataSource.data.length === 0) {
      window.alert('Please choose a recipe')
    } else {
      this.dataSource.data.map(field => {

        let counter: number = 0;
  
        this.service.getFlavourID(field['supplier'], field['name']).subscribe(res => {
          res.map(i => {
            this.flavourID = i.payload.doc.id;
            this.newStock = field['on_hand'] - field['quantity'];
            if(counter === 0) {
              this.service.updateFlavourStock(this.flavourID, this.newStock);
              counter++;
            }
          });
        });
      })
      window.alert('Batch committed')
    }

  }

}
