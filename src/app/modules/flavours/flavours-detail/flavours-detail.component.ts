import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { FlavoursService } from 'app/data/service/flavours.service';

export class Flavour {
  name: string;
  supplier: string;
  stock: number;
  cost: number;
  unit: string;
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
    unit: new FormControl(),
    notes: new FormControl('')
  });

  unitList: string[] = [
    'Millilitre', 'Litre', 'Ounce', '16 Ounce', 'Gallon'
  ]

  constructor(private route: ActivatedRoute, private service: FlavoursService, private router: Router) { }

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
      this.flavourData.unit = res['unit'];
      this.flavourData.stock = +parseFloat(res['stock']).toFixed(2);
      this.flavourData.cost = +parseFloat(res['cost']).toFixed(2);
      res['notes'] ? this.flavourData.notes = res['notes'] : this.flavourData.notes = 'None';
      this.flavourForm.setValue(this.flavourData)

    });


    
    
  }

  clickHandler() {
      this.service.updateFlavour(this.id, this.flavourForm.value);
      this.router.navigate(['admin/flavours'])
  }

  deleteHandler() {
    if(confirm('Are you sure?')) {
      this.service.deleteFlavour(this.id);      
    }
  }

}
