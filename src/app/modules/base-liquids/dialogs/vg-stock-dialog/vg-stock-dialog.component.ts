import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  base: string;
  stock: number;
}


@Component({
  selector: 'app-vg-stock-dialog',
  templateUrl: './vg-stock-dialog.component.html',
  styleUrls: ['./vg-stock-dialog.component.css']
})
export class VgStockDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VgStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}
