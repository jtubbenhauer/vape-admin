import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calculator-dialog',
  templateUrl: './calculator-dialog.component.html',
  styleUrls: ['./calculator-dialog.component.css']
})
export class CalculatorDialogComponent implements OnInit {

  vgInput: number = 0;
  pgInput: number = 0;
  vgResult: number = 0;
  pgResult: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CalculatorDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  calc() {
    this.vgResult = +(this.vgInput * 1.261).toFixed(1);
    this.pgResult = +(this.pgInput * 1.036).toFixed(1);
  }

}
