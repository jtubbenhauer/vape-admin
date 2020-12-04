import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from "@angular/forms";
import { MixingService } from 'app/data/service/mixing.service';
import { map, startWith } from 'rxjs/operators';

export interface Recipe {
  name: string;
  id: string;
}

function vgPercentValidator(control: FormControl) {
  let percent = control.value;
  if (percent < 50 || percent > 80) {
    return { 'vgPercentValidator': true }
  }
  return null;
}

@Component({
  selector: 'app-rtv',
  templateUrl: './rtv.component.html',
  styleUrls: ['./rtv.component.css', '../mixing.component.css']
})
export class RtvComponent implements OnInit {

  dataSourceConc = new MatTableDataSource();
  dataSourceDoubler = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  //Form items
  displayedColumnsConc: string[] = ['concentrate', 'vg', 'pg']
  displayedColumnsDoubler: string[] = ['doubler', 'doublervg', 'doublerpg']
  recipe = new FormControl();
  size = new FormControl(1800);
  vgPercentage = new FormControl(70, vgPercentValidator);

  recipeList: Recipe[] = [];
  filteredOptions: Observable<Recipe[]>;

  //Calculate button stuff
  totalPercentage: number;
  addConcentrate: number;
  addVG: number;
  addPG: number;
  addVGDoubler: number;
  addPGDoubler: number;
  doublerWeight: number;
  tableDataConc = [];
  tableDataDoubler = [];

  //Commit vars
  commitVG: number;
  commitPG: number;
  totalVG: number;
  totalPG: number;

  constructor(private service: MixingService) { }


  ngOnInit(): void {
    this.service.getRecipesValue().subscribe(res => {
      res.map(i => {
        this.recipeList.push({
          name: i.payload.doc.data()['name'],
          id: i.payload.doc.id
        }
        )
      });
      this.filteredOptions = this.recipe.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.recipeList.slice())
      );
    })
  }

  //Searchable Autocomplete
  displayFn(recipe: Recipe): string {
    return recipe && recipe.name ? recipe.name : '';
  }
  
  private _filter(name: string): Recipe[] {
    const filterValue = name.toLowerCase();

    return this.recipeList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


  calculateButton() {
    this.totalPercentage = 0;

    this.tableDataConc = [];
    this.tableDataDoubler = [];
    
    this.service.getFlavoursFromID(this.recipe.value['id']).subscribe(res => {
      res.map(i => {
        this.totalPercentage += +i.percentage
      });
      this.addConcentrate = this.service.calcConcentrate(+this.size.value, +this.totalPercentage);
      this.addVG = this.service.calcVG(+this.size.value, +this.vgPercentage.value);
      this.addPG = this.service.calcPG(+this.size.value, this.addConcentrate, this.addVG);
      this.tableDataConc.push({
        'concentrate': this.addConcentrate,
        'vg': this.addVG,
        'pg': this.addPG,
      });
      this.addVGDoubler = this.addVG / 1.75;
      this.addPGDoubler = this.addPG / 1.6;
      this.doublerWeight = (this.addConcentrate + this.addVG + this.addPG) - (this.addVGDoubler + this.addPGDoubler);
      this.tableDataDoubler.push({
        'doubler': +this.doublerWeight.toFixed(1),
        'doublervg': +this.addVGDoubler.toFixed(1),
        'doublerpg': +this.addPGDoubler.toFixed(1)
      });

      this.dataSourceConc.data = this.tableDataConc;
      this.dataSourceDoubler.data = this.tableDataDoubler;
    })
  }

  commitRTV() {
    this.commitVG = this.tableDataConc[0].vg / 1000;    
    this.commitPG = this.tableDataConc[0].pg / 1000;

    let vg_count = 0
    let pg_count = 0

    this.service.getVGStock().subscribe(res => {
      this.totalVG = res['stock'] - this.commitVG;
      if (vg_count === 0) {
        this.service.updateBaseStock('vg', this.totalVG);
        vg_count++;
      }
    });
    this.service.getPGStock().subscribe(res => {
      this.totalPG = res['stock'] - this.commitPG;
      if (pg_count === 0) {
        this.service.updateBaseStock('pg', this.totalPG);
        pg_count++;
      }
    });
    
  }

  commitDoubler() {
    this.commitVG = this.tableDataDoubler[0].doublervg / 1000;
    this.commitPG = this.tableDataDoubler[0].doublerpg / 1000;

    let vg_count = 0
    let pg_count = 0

    this.service.getVGStock().subscribe(res => {
      this.totalVG = res['stock'] - this.commitVG;
      if (vg_count === 0) {
        this.service.updateBaseStock('vg', +this.totalVG.toFixed(1));
        vg_count++;
      }
    });
    this.service.getPGStock().subscribe(res => {
      this.totalPG = res['stock'] - this.commitPG;
      if (pg_count === 0) {
        this.service.updateBaseStock('pg', +this.totalPG.toFixed(1));
        pg_count++;
      }
    });
  }

}
