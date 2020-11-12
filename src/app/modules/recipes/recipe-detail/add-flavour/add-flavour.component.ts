import { Component, OnInit, Input } from '@angular/core';
import { FlavoursService } from 'app/data/service/flavours.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RecipesService } from 'app/data/service/recipes.service';

@Component({
  selector: 'app-add-flavour',
  templateUrl: './add-flavour.component.html',
  styleUrls: ['./add-flavour.component.css']
})
export class AddFlavourComponent implements OnInit {

  @Input() id: string;

  options: string[] = [];
  flavourNameSupplier = new FormControl('');
  percentage = new FormControl('');
  filteredOptions: Observable<string[]>;
  data = {};

  newSupplier: string;
  newName: string;

  constructor(private flavoursService: FlavoursService, private recipeService: RecipesService) { }

  ngOnInit(): void {

    this.flavoursService.getFlavours().subscribe(item => {
      item.map(i => {
        this.options.push(i['supplier'] + ' - ' + i['name']);
        
      })
    })
    
    this.filteredOptions = this.flavourNameSupplier.valueChanges.pipe(
      startWith(''),map(value => this._filter(value))
    )
  }

  formSubmit() {
    const splitArray = this.flavourNameSupplier.value.split(' - ');
    this.data = {
      'supplier': splitArray[0],
      'name': splitArray[1],
      'id': this.id,
      'percentage': this.percentage.value
    }
    this.recipeService.addIngredient(this.data);
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue))
  }

}
