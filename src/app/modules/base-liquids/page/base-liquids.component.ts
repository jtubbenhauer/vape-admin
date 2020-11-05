import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseLiquidsService } from "app/data/service/base-liquids.service";

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

  constructor(private service: BaseLiquidsService) {
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
