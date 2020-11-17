import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-concentrate-table',
  templateUrl: './concentrate-table.component.html',
  styleUrls: ['./concentrate-table.component.css']
})
export class ConcentrateTableComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['supplier', 'name', 'percentage', 'quantity', 'on_hand'];
  dataSource = new MatTableDataSource();

  @Input('recipe') recipeData: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(changes.recipeData.currentValue)
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

}
