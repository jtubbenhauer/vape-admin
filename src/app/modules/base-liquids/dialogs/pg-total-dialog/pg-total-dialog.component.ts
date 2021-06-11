import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pg-total-dialog',
  templateUrl: './pg-total-dialog.component.html',
  styleUrls: ['./pg-total-dialog.component.css']
})
export class PgTotalDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PgTotalDialogComponent>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
