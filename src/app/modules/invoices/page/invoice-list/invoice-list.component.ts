import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from 'app/data/service/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['invoice', 'supplier', 'date', 'status']
  tableData: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: InvoiceService) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {

    this.service.getInvoices().snapshotChanges().subscribe(res => {
      res.map(i => {        
        this.tableData.push({
          'invoice': i.payload.doc.id,
          'supplier': i.payload.doc.data()['supplier'],
          'date': i.payload.doc.data()['date'],
          'status': i.payload.doc.data()['status']
        });
        
      });
      
      let uniqueData = this.tableData.filter((v,i,a)=>a.findIndex(t=>(t.invoice === v.invoice))===i);     
      
      this.dataSource.data = uniqueData;
    })
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
