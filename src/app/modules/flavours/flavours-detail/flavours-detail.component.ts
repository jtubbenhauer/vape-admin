import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { FlavoursService } from 'app/data/service/flavours.service';

export class Flavour {
  name: string;
  supplier: string;
  stock: number;
  cost: number;
  notes: string;
}

@Component({
  selector: 'app-flavours-detail',
  templateUrl: './flavours-detail.component.html',
  styleUrls: ['./flavours-detail.component.css']
})
export class FlavoursDetailComponent implements OnInit {

  id: string;
  flavourData = new Flavour();
  updateData = new Flavour();

  suppliers: any = [];
  
  flavourForm = new FormGroup({
    name: new FormControl(),
    supplier: new FormControl(),
    stock: new FormControl(),
    cost: new FormControl(),
    notes: new FormControl('')
  })

  constructor(private route: ActivatedRoute, private service: FlavoursService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initData();
  }

  initData() {

    this.service.getSuppliers().subscribe(res => {
      res.map(i => {
        this.suppliers.push(i['name'])
      })
    })

    this.service.getFlavourFromID(this.id).subscribe(res => {
      this.flavourData.supplier = res['supplier'];
      this.flavourData.name = res['name'];
      this.flavourData.stock = +parseFloat(res['stock']).toFixed(1);
      this.flavourData.cost = +parseFloat(res['cost']).toFixed(1);
      res['notes'] ? this.flavourData.notes = res['notes'] : this.flavourData.notes = 'None';
      this.flavourForm.setValue(this.flavourData)
    });
    
  }

  clickHandler() {
      this.service.updateFlavour(this.id, this.flavourForm.value);
  }

}
