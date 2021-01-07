import { Component, OnInit } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import { AddFlavourDialogComponent } from "./add-flavour-dialog/add-flavour-dialog.component";
import { FlavoursService } from "app/data/service/flavours.service";
import { Papa } from "ngx-papaparse";

export interface DialogData {
  supplierList: any;
  supplier: string;
  name: string;
  cost: number;
  stock: number;
  unit: string;
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
  cost: number = 0;
  stock: number = 0;
  unit: string;
  csvOutput: string[] = []

  constructor(private dialog: MatDialog, private service: FlavoursService, private papa: Papa) { }

  openAddFlavourDialog(): void {
    console.log(this.supplierList);
    
    const addFlavourDialogRef = this.dialog.open(AddFlavourDialogComponent, {
      width: '500px',
      data: {
        supplierList: this.supplierList,
        supplier: this.supplier,
        name: this.name,
        cost: this.cost,
        stock: this.stock,
        unit: this.unit
      }
    });

    addFlavourDialogRef.afterClosed().subscribe(res => {
      console.log(res);
      
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

  csvInputChange(fileInputEvent: any) {
    let csvData = fileInputEvent.target.files[0];

    this.papa.parse(csvData,{
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
          this.service.addFromCSV(result.data);
      }
  });
  }

}
