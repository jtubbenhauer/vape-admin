import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FlavoursService } from "app/data/service/flavours.service";

@Component({
  selector: 'app-flavours-table',
  templateUrl: './flavours-table.component.html',
  styleUrls: ['./flavours-table.component.css']
})
export class FlavoursTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['supplier', 'name', 'stock', 'cost', 'notes', 'edit'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: FlavoursService) { }

  ngOnInit() {
    return this.service.getFlavours().subscribe(res => {
      res.map(i => {
        i['stock'] = +parseFloat(i['stock']).toFixed(1);
      });
      this.dataSource.data = res;
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

