import { Component, OnInit } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import { AddFlavourDialogComponent } from "./add-flavour-dialog/add-flavour-dialog.component";
import { FlavoursService } from "app/data/service/flavours.service";

export interface DialogData {
  supplierList: any;
  supplier: string;
  name: string;
  cost: number;
  stock: number;
}

@Component({
  selector: 'app-flavours',
  templateUrl: './flavours.component.html',
  styleUrls: ['./flavours.component.css']
})
export class FlavoursComponent implements OnInit {

  supplierList: any = [];
  supplier: string;
  name: string;
  cost: number;
  stock: number;

  constructor(private dialog: MatDialog, private service: FlavoursService) { }

  openAddFlavourDialog(): void {
    const addFlavourDialogRef = this.dialog.open(AddFlavourDialogComponent, {
      width: '400px',
      data: {
        supplierList: this.supplierList,
        supplier: this.supplier,
        name: this.name,
        cost: this.cost,
        stock: this.stock,
      }
    });

    addFlavourDialogRef.afterClosed().subscribe(res => {
      this.service.addFlavour(res);
    })
  }
  
  ngOnInit(): void {
    this.service.getSuppliers().subscribe(res => {
      res.forEach(item => {
        this.supplierList.push(item['name'])
      })
    })
    
  }

}
