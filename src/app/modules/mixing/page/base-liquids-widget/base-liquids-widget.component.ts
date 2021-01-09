import { Component, OnInit } from '@angular/core';
import { MixingService } from 'app/data/service/mixing.service';
import { MatDialog } from '@angular/material/dialog';
import { CalculatorDialogComponent } from './calculator-dialog/calculator-dialog.component';


@Component({
  selector: 'app-base-liquids-widget',
  templateUrl: './base-liquids-widget.component.html',
  styleUrls: ['./base-liquids-widget.component.css']
})
export class BaseLiquidsWidgetComponent implements OnInit {

  vgStock: number;
  pgStock: number;

  constructor(private service: MixingService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.service.getVGStock().subscribe(res => {
      this.vgStock = +res['stock'].toFixed(2)
    })
    this.service.getPGStock().subscribe(res => {
      this.pgStock = +res['stock'].toFixed(2)
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CalculatorDialogComponent, {
      width: '500px'
    });

  }

}
