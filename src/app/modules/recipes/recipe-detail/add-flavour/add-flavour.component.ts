import { Component, OnInit, Input } from '@angular/core';
import { FlavoursService } from 'app/data/service/flavours.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RecipesService } from 'app/data/service/recipes.service';

export interface Flavour {
  name: string;
  id: string;
  unit: string;
}

@Component({
  selector: 'app-add-flavour',
  templateUrl: './add-flavour.component.html',
  styleUrls: ['./add-flavour.component.css']
})
export class AddFlavourComponent implements OnInit {

  @Input() id: string;

  flavourList: Flavour[] = [];
  flavour = new FormControl();
  percentage = new FormControl('');
  filteredOptions: Observable<Flavour[]>;
  data = {};

  newSupplier: string;
  newName: string;

  constructor(private flavoursService: FlavoursService, private recipeService: RecipesService) { }

  ngOnInit(): void {

    this.flavoursService.getFlavours().subscribe(item => {
      item.map(i => {        
        this.flavourList.push({
          'name': i['supplier'] + ' - ' + i['name'],
          'unit': i['unit'],
          'id': i['id']
      });
      });
      this.filteredOptions = this.flavour.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value: value.name),
        map(name => name ? this._filter(name) : this.flavourList.slice())
      )
    })
    
    
  };

  displayFn(flavour: Flavour): string {
    return flavour && flavour.name ? flavour.name : ''; 
    
  }

  private _filter(name: string): Flavour[] {
    const filterValue = name.toLowerCase();

    return this.flavourList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  formSubmit() {
    
    const splitArray = this.flavour.value['name'].split(' - ');
    this.data = {
      'supplier': splitArray[0],
      'name': splitArray[1],
      'id': this.id,
      'percentage': this.percentage.value
    }
    this.recipeService.addIngredient(this.data);
    
  }

  

}
