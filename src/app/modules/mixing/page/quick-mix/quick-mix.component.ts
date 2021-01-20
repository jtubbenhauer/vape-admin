import { Component, OnInit } from '@angular/core';
import { MixingService } from 'app/data/service/mixing.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';



export interface Recipe {
  name: string;
  id: string;
}

@Component({
  selector: 'app-quick-mix',
  templateUrl: './quick-mix.component.html',
  styleUrls: ['./quick-mix.component.css', '../mixing.component.css']
})
export class QuickMixComponent implements OnInit {

  //Recipe select
  recipe = new FormControl();
  recipeList: Recipe[] = [];
  filteredOptions: Observable<Recipe[]>;

  //Table data
  dataSourceConc = new MatTableDataSource();
  dataSourceDoubler = new MatTableDataSource();
  tableDataConc = [];
  tableDataDoubler = [];
  displayedColumnsConc: string[] = ['concentrate', 'vg', 'pg', 'nic'];
  displayedColumnsDoubler: string[] = ['doubler', 'doublervg', 'doublerpg', 'doublernic']

  //Form controls
  size = new FormControl(100);
  nicvg = new FormControl(0);
  nicstrength = new FormControl(100);
  targetvg = new FormControl(70);
  targetnic = new FormControl(3);

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
      });
      //From Concentrate Table
      let addConcentrate = this.service.calcConcentrate(+this.size.value, +totalPercentage);
      let addNic = (this.targetnic.value / this.nicstrength.value) * this.size.value;
      let addVG = (((this.targetvg.value / 100) * this.size.value) - ((this.nicvg.value / 100) * addNic)) * 1.261
      let addPG = (this.size.value - (addVG / 1.261) - addConcentrate - addNic) * 1.0361
      this.tableDataConc.push({
        'concentrate': +addConcentrate.toFixed(1),
        'vg': +addVG.toFixed(1),
        'pg': +addPG.toFixed(1),
        'nic': +addNic.toFixed(1)
      });
      this.dataSourceConc.data = this.tableDataConc;

      //From Doubler Table
      let doubler = this.service.calcDoubler(this.size.value, totalPercentage)
      this.tableDataDoubler.push({
        'doubler': +(doubler.conc + doubler.vg + doubler.pg).toFixed(1),
        'vg': +(addVG - doubler.vg).toFixed(1),
        'pg': +(addPG - doubler.pg).toFixed(1),
        'nic': +addNic.toFixed(1)
      });
      this.dataSourceDoubler.data = this.tableDataDoubler;
      
    })
  }; 


  commitButton(mixType) {
    let tableData = (mixType === 'Conc') ? this.tableDataConc : this.tableDataDoubler
    let commitVG = +tableData[0].vg / 1000;
    let commitPG = +tableData[0].pg / 1000;
    let vgCount = 0;
    let pgCount = 0;

    if (confirm('Commit batch?')) {
      this.service.addBatchHistory(this.recipe.value['name'], 'Quick-Mix')

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


