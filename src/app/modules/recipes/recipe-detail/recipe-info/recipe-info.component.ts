import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RecipesService } from 'app/data/service/recipes.service';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css']
})
export class RecipeInfoComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(private service: RecipesService) { }

  @Input() title: string;
  @Input() collection: string;
  @Input() concentrate: string;
  @Input() unit: string;
  
  
  newConcentrate = new FormControl();
  newName = new FormControl();
  newCollection = new FormControl();

  ngOnInit(): void {
    
  }

  ngOnChanges() {

  }

  ngAfterViewInit(): void {
    console.log(this.title);

  }

  updateValue() {
    this.service.newConcentrate = this.newConcentrate.value? this.newConcentrate.value: this.concentrate;
    this.service.newCollection = this.newCollection.value? this.newCollection.value: this.collection;
    this.service.newName = this.newName.value? this.newName.value : this.title;
    this.service.changed = true;
  }

}
