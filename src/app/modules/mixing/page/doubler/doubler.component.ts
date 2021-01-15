import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
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
  if (percent < 40 || percent > 65) {
    return { 'vgPercentValidator': true }
  }
  return null;
}

@Component({
  selector: 'app-doubler',
  templateUrl: './doubler.component.html',
  styleUrls: ['./doubler.component.css', '../mixing.component.css']
})
export class DoublerComponent implements OnInit {

  dataSource = new MatTableDataSource();
  tableData = [];
  displayedColumns: string[] = ['concentrate', 'vg', 'pg']
  filteredOptions: Observable<Recipe[]>;

  recipe = new FormControl();
  size = new FormControl(1800);
  vgPercentage = new FormControl(60, vgPercentValidator);

  recipeList: Recipe[] = [];
  totalPercentage: number;
  addConcentrate: number;
  addVG: number;
  addPG: number;


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
    this.tableData = [];
    this.totalPercentage = 0;

    this.service.getFlavoursFromID(this.recipe.value['id']).subscribe(res => {
      res.map(i => {
        this.totalPercentage += +i.percentage;
      });
      this.addConcentrate = this.service.calcConcentrate(this.size.value, this.totalPercentage) * 2;
      this.addVG = this.service.calcDoublerVG(this.size.value, this.vgPercentage.value);
      this.addPG = this.service.calcDoublerPG(this.size.value, this.addVG, this.addConcentrate); 
      this.tableData.push({
        'concentrate': +this.addConcentrate,
        'vg': +this.addVG,
        'pg': +this.addPG
      });

      this.dataSource.data = this.tableData
    })
    
  }

  commitButton() {
    let commitVG = this.tableData[0].vg / 1000;
    let commitPG = this.tableData[0].pg / 1000;
    let vgCount = 0;
    let pgCount = 0;

    if (confirm('Commit batch?')) {
      this.service.getVGStock().subscribe(res => {
        let totalVG = res['stock'] - commitVG;
        if (vgCount === 0) {
          this.service.updateBaseStock('vg', +totalVG.toFixed(1));
          vgCount++;
        }
      });
      this.service.getPGStock().subscribe(res => {
        let totalPG = res['stock'] - commitPG;
        if (pgCount === 0) {
          this.service.updateBaseStock('pg', +totalPG.toFixed(1));
          pgCount++;
        }
      });
    }

    
  }

}
