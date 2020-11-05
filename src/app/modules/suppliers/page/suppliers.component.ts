import { Component, OnInit } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import { AddSupplierDialogComponent } from "./add-supplier-dialog/add-supplier-dialog.component";
import { SuppliersService } from "app/data/service/suppliers.service";

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  name: string

  constructor(private dialog: MatDialog, private service: SuppliersService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddSupplierDialogComponent, {
      width: '250px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(res => {
      this.service.addSupplier(res);
    })
  };


  ngOnInit(): void {
  }

}
