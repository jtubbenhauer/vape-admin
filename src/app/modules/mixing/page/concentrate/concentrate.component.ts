import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MixingConcentrateService } from 'app/data/service/mixing-concentrate.service';

export interface Recipe {
  name: string;
}

@Component({
  selector: 'app-concentrate',
  templateUrl: './concentrate.component.html',
  styleUrls: ['./concentrate.component.css']
})
export class ConcentrateComponent implements OnInit {

  recipeList: Recipe[] = [];
  recipe = new FormControl();
  filteredOptions: Observable<Recipe[]>;
  id: string;
  size = new FormControl('1800');

  constructor( private service: MixingConcentrateService ) {

  }

  ngOnInit(): void {
    this.service.getRecipesValue().subscribe(res => {
      res.map(i => {
        this.recipeList.push(
          {name: i.payload.doc.data()['name']}
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

    return this.recipeList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  clickHandler() {
    this.service.getIdFromName(this.recipe.value.name).subscribe(res => {
      res.map(i => {
        this.id = i.payload.doc.id;        
      })
    })
  }


}
