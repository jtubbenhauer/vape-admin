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
  tableDataConc = [];
  tableDataDoubler = [];

  @ViewChild(MatSort) sort: MatSort;

  //Form items
  displayedColumnsConc: string[] = ['concentrate', 'vg', 'pg']
  displayedColumnsDoubler: string[] = ['doubler', 'doublervg', 'doublerpg']
  recipe = new FormControl();
  size = new FormControl(1800);
  vgPercentage = new FormControl(70, vgPercentValidator);

  recipeList: Recipe[] = [];
  filteredOptions: Observable<Recipe[]>;

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

    return this.recipeList.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  calculateButton() {
    let totalPercentage = 0;

    this.tableDataConc = [];
    this.tableDataDoubler = [];
    
    this.service.getFlavoursFromID(this.recipe.value['id']).subscribe(res => {
      res.map(i => {
        totalPercentage += +i.percentage
        console.log(i);
        
      });
      let addConcentrate = this.service.calcConcentrate(+this.size.value, +totalPercentage);
      let addVG = this.service.calcVG(+this.size.value, +this.vgPercentage.value);
      let addPG = this.service.calcPG(+this.size.value, +addConcentrate, +addVG);
      this.tableDataConc.push({
        'concentrate': +addConcentrate.toFixed(1),
        'vg': +addVG.toFixed(1),
        'pg': +addPG.toFixed(1),
      });
      this.dataSourceConc.data = this.tableDataConc;

      let doubler = this.service.calcDoubler(this.size.value, totalPercentage)
      this.tableDataDoubler.push({
        'doubler': +(Object.values(doubler).reduce((a, b) => a + b, 0)).toFixed(1),
        'vg': +(addVG - doubler.vg).toFixed(1),
        'pg': +(addPG - doubler.pg).toFixed(1)
      });

      this.dataSourceDoubler.data = this.tableDataDoubler;
    })
  }

  commitButton(mixType) {
    let tableData = (mixType === 'Conc') ? this.tableDataConc : this.tableDataDoubler;
    let commitVG = +tableData[0].vg / 1000;
    let commitPG = +tableData[0].pg / 1000;
    let vgCount = 0;
    let pgCount = 0;
    
    if(tableData[0].concentrate) {

    }

    if (confirm('Commit batch?')) {
      this.service.getVGStock().subscribe(res => {
        let totalVG = +res['stock'] - +commitVG;
        if (vgCount === 0) {
          this.service.updateBaseStock('vg', +totalVG.toFixed(1));
          vgCount++;
        }
      });
      this.service.getPGStock().subscribe(res => {
        let totalPG = +res['stock'] - +commitPG;
        if (pgCount === 0) {
          this.service.updateBaseStock('pg', +totalPG.toFixed(1));
          pgCount++;
        }
      });
    }
    
    
  }

}
