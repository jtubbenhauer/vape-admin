import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MixingService } from 'app/data/service/mixing.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Recipe {
  name: string;
  id: string;
}

@Component({
  selector: 'app-concentrate',
  templateUrl: './concentrate.component.html',
  styleUrls: ['./concentrate.component.css', '../mixing.component.css']
})
export class ConcentrateComponent implements OnInit {

  displayedColumns: string[] = ['supplier', 'name', 'percentage', 'quantity', 'on_hand'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  newStock: number;
  flavourID: string;

  updateStock: any = [];

  recipe = new FormControl();
  size = new FormControl(1800);
  
  recipeList: Recipe[] = [];
  filteredOptions: Observable<Recipe[]>;

  recipeID: string;
  quantity: any;
  percentages: any[];
  totalPercentage: number;

  recipeResult: any[] = [];

  constructor( private service: MixingService ) {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.service.getRecipesValue().subscribe(res => {
      res.map(i => {
        this.recipeList.push({
          name: i.payload.doc.data()['name'],
          id: i.payload.doc.id
        });
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
    this.percentages = [];
    this.totalPercentage = 0;

    this.service.getFlavoursFromID(this.recipeID).subscribe(res => {
      res.map(i => {
        this.totalPercentage += +i.percentage
      });
      this.service.getFlavoursFromID(this.recipeID).subscribe(res => {
        res.map(i => {
          this.quantity = this.size.value * (i.percentage / this.totalPercentage);
          this.recipeResult.push({
            'supplier': i.supplier,
            'name': i.name,
            'percentage': i.percentage,
            'quantity': +this.quantity.toFixed(1)
          });
        });
        
        this.recipeResult.map(recipe => {
          this.service.getStockOnHand(recipe).subscribe(res => {
            res.map(flavour => {
              recipe.on_hand = +parseFloat(flavour['stock']).toFixed(1);
            })
          })
        });
        this.dataSource.data = this.recipeResult
      })
    })
  };

  commitBatch() {
    if (confirm('Are you sure?')) {
      if(this.dataSource.data.length === 0) {
        window.alert('Please choose a recipe')
      } else {
        let totalConc: number = 0;
        this.dataSource.data.map(field => {
          let counter: number = 0;
          totalConc += field['quantity']
          this.service.getFlavourID(field['supplier'], field['name']).subscribe(res => {
            res.map(i => {
              this.flavourID = i.payload.doc.id;
              this.newStock = field['on_hand'] - field['quantity'];
              if(counter === 0) {
                this.service.updateFlavourStock(this.flavourID, this.newStock);
                counter++;
              };
            });
          });
        });
        let count = 0;
        let newConc: number = 0;
        this.service.getRecipeByID(this.recipeID).subscribe(res => {
          if (count === 0) {
            newConc = +res['concentrate'] + totalConc;
            this.service.updateConcentrate(this.recipeID, newConc);    
            count++;
          };
        });
        
        window.alert('Batch committed')
      }
    }
  }


}
