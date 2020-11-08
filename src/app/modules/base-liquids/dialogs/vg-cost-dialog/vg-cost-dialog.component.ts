import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  base: string;
  cost: number;
}

@Component({
  selector: 'app-vg-cost-dialog',
  templateUrl: './vg-cost-dialog.component.html',
  styleUrls: ['./vg-cost-dialog.component.css']
})
export class VgCostDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VgCostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
