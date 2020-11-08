import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  base: string;
  stock: number;
}

@Component({
  selector: 'app-pg-stock-dialog',
  templateUrl: './pg-stock-dialog.component.html',
  styleUrls: ['./pg-stock-dialog.component.css']
})
export class PgStockDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PgStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
