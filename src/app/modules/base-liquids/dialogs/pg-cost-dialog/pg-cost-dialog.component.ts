import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  base: string;
  cost: number;
}

@Component({
  selector: 'app-pg-cost-dialog',
  templateUrl: './pg-cost-dialog.component.html',
  styleUrls: ['./pg-cost-dialog.component.css']
})
export class PgCostDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PgCostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
