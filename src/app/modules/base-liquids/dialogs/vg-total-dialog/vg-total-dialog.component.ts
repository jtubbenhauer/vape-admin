import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  base: string;
  stock: number;
}


@Component({
  selector: 'app-vg-total-dialog',
  templateUrl: './vg-total-dialog.component.html',
  styleUrls: ['./vg-total-dialog.component.css']
})
export class VgTotalDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VgTotalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
