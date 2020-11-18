import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { FlavoursService } from 'app/data/service/flavours.service';

export class Flavour {
  name: string;
  supplier: string;
  stock: string;
  cost: string;
  notes?: string;
}

@Component({
  selector: 'app-flavours-detail',
  templateUrl: './flavours-detail.component.html',
  styleUrls: ['./flavours-detail.component.css']
})
export class FlavoursDetailComponent implements OnInit {

  id: string;
  flavourData = new Flavour();
  suppliers: any = [];
  name = new FormControl()

  constructor(private route: ActivatedRoute, private service: FlavoursService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.service.getFlavourFromID(this.id).subscribe(res => {
      this.flavourData.supplier = res['supplier'];
      this.flavourData.name = res['name'];
      this.flavourData.stock = res['stock'];
      this.flavourData.cost = res['cost'];
      this.flavourData.notes = res['notes'];
    });

    this.service.getSuppliers().subscribe(res => {
      res.map(i => {
        this.suppliers.push(i['name'])
      })
    })
  }

  clickHandler() {
    this.name.value ? console.log(this.name.value) : console.log(this.flavourData.name);
      
  
  }

}
