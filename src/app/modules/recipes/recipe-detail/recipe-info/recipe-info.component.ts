import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RecipesService } from 'app/data/service/recipes.service';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css']
})
export class RecipeInfoComponent implements OnInit, OnChanges {

  constructor(private service: RecipesService) { }

  @Input() title: string;
  @Input() collection: string;
  @Input() concentrate: string;

  
  newConcentrate = new FormControl();
  newName = new FormControl();
  newCollection = new FormControl();

  ngOnInit(): void {
  }

  ngOnChanges() {

  }

  updateValue() {
    this.service.newConcentrate = this.newConcentrate.value? this.newConcentrate.value: this.concentrate;
    this.service.newCollection = this.newCollection.value? this.newCollection.value: this.collection;
    this.service.newName = this.newName.value? this.newName.value : this.title;
    this.service.changed = true;
  }

}
