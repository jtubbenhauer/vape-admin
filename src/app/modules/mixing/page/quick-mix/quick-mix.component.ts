import { Component, OnInit } from '@angular/core';
import { MixingService } from 'app/data/service/mixing.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from "@angular/forms";



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

  recipe = new FormControl();
  recipeList: Recipe[] = [];
  filteredOptions: Observable<Recipe[]>;

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
    return this.recipeList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
