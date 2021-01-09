import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calculator-dialog',
  templateUrl: './calculator-dialog.component.html',
  styleUrls: ['./calculator-dialog.component.css']
})
export class CalculatorDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CalculatorDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

}
