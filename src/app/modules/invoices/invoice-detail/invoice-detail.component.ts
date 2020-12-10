import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InvoiceService } from 'app/data/service/invoice.service';


@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute, private service: InvoiceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.service.getInvoiceNo().subscribe(res => {
      if (res) {
        console.log('we got');
      } else {
        this.service.initInvoiceCount();
      }
      
    })
  }

}
