import { Component, OnInit } from '@angular/core';
import { FlavoursService } from "app/data/service/flavours.service";

@Component({
  selector: 'app-flavours',
  templateUrl: './flavours.component.html',
  styleUrls: ['./flavours.component.css']
})
export class FlavoursComponent implements OnInit {

  constructor(private service: FlavoursService) { }

  ngOnInit(): void {
    this.service.getFlavours();
    
  }

}
