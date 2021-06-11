import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import { VgStockDialogComponent } from "../dialogs/vg-stock-dialog/vg-stock-dialog.component";
import { PgStockDialogComponent } from "../dialogs/pg-stock-dialog/pg-stock-dialog.component";
import { BaseLiquidsService } from "app/data/service/base-liquids.service";
import { VgCostDialogComponent } from '../dialogs/vg-cost-dialog/vg-cost-dialog.component';
import { PgCostDialogComponent } from '../dialogs/pg-cost-dialog/pg-cost-dialog.component';
import { PgTotalDialogComponent } from '../dialogs/pg-total-dialog/pg-total-dialog.component';
import { VgTotalDialogComponent } from '../dialogs/vg-total-dialog/vg-total-dialog.component';

@Component({
  selector: 'app-base-liquids',
  templateUrl: './base-liquids.component.html',
  styleUrls: ['./base-liquids.component.css']
})
export class BaseLiquidsComponent implements OnInit, AfterViewInit {

  vgStock: any;
  vgCost: any;
  pgStock: any;
  pgCost: any;
  
  pgNewCost: number;
  vgNewCost: number;

  vgStockToAdd: number;
  pgStockToAdd: number;

  constructor(private dialog: MatDialog, private service: BaseLiquidsService) {
  }

  openVgStockDialog(): void {
    const vgStockDialogRef = this.dialog.open(VgStockDialogComponent, {
      width: '250px',
      data: {base: 'vg', stock: this.vgStockToAdd}
    });

    vgStockDialogRef.afterClosed().subscribe(res => {
      this.service.addStock(res.base, res.stock);
    })
  };

  openPgStockDialog(): void {
    const pgStockDialogRef = this.dialog.open(PgStockDialogComponent, {
      width: '250px',
      data: {base: 'pg', stock: this.pgStockToAdd}
    });

    pgStockDialogRef.afterClosed().subscribe(res => {
      this.service.addStock(res.base, res.stock);
    })
  };

  openVgCostDialog(): void {
    const vgCostDialogRef = this.dialog.open(VgCostDialogComponent,
    {
      width: '250px',
      data: { base: 'vg', cost: this.vgNewCost }
    });

    vgCostDialogRef.afterClosed().subscribe(res => {
      this.service.updateCost(res.base, res.cost)
    })
  };

  openPgCostDialog(): void {
    const pgCostDialogRef = this.dialog.open(PgCostDialogComponent,
    {
      width: '250px',
      data: { base: 'pg', cost: this.pgNewCost }
    });

    pgCostDialogRef.afterClosed().subscribe(res => {
      this.service.updateCost(res.base, res.cost)
    })
  };

  openPgTotalDialog(): void {
    const pgTotalDialogRef = this.dialog.open(PgTotalDialogComponent,
    {
      width: '250px',
      data: {
        'base': 'vg',
        'stock': 'stock'
      }

      //update stock via service
    }
      )}

  openVgTotalDialog(): void {
    const vgTotalDialogRef = this.dialog.open(VgTotalDialogComponent,
    {
      width: '250px'
    }
      )
  }



  ngOnInit() {
    
    this.service.getVG().subscribe(res => {
      this.vgStock = res.stock;
      this.vgCost = res.cost;
    })

    this.service.getPG().subscribe(res => {
      this.pgStock = res.stock;
      this.pgCost = res.cost;
    })
  }

  ngAfterViewInit() {
    
  }

}
