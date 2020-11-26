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
  selector: 'app-doubler',
  templateUrl: './doubler.component.html',
  styleUrls: ['./doubler.component.css', '../mixing.component.css']
})
export class DoublerComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['concentrate', 'vg', 'pg']
  recipeList: Recipe[] = [];
  filteredOptions: Observable<Recipe[]>;

  recipe = new FormControl();
  size = new FormControl(1800);
  vgPercentage = new FormControl(70, vgPercentValidator);


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

  }

  commitButton() {
    
  }

}
