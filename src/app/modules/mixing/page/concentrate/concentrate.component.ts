import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MixingConcentrateService } from 'app/data/service/mixing-concentrate.service';

export interface Recipe {
  name: string;
  id: string;
}

@Component({
  selector: 'app-concentrate',
  templateUrl: './concentrate.component.html',
  styleUrls: ['./concentrate.component.css']
})
export class ConcentrateComponent implements OnInit {

  recipe = new FormControl();
  size = new FormControl(1800);
  
  recipeList: Recipe[] = [];
  filteredOptions: Observable<Recipe[]>;

  recipeID: string;
  quantity: any;

  recipeResult: any[] = [];

  @Output() recipeData: EventEmitter<any> = new EventEmitter<any>();

  constructor( private service: MixingConcentrateService ) {
  }

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

  clickHandler() {
    this.recipeResult = [];
    this.recipeID = this.recipe.value['id'];

    this.service.getFlavoursFromID(this.recipe.value['id']).subscribe(res => {
      res.map(i => {
        this.quantity = this.size.value * (i.percentage / 100);
        this.recipeResult.push({
          'supplier': i.supplier,
          'name': i.name,
          'percentage': i.percentage,
          'quantity': this.quantity
        });
      });
      
      this.recipeResult.map(recipe => {
        this.service.getStockOnHand(recipe).subscribe(res => {
          res.map(flavour => {
            recipe.on_hand = flavour['stock']
          })
        })
      });
      this.recipeData.emit(this.recipeResult);
    })
  };


}
