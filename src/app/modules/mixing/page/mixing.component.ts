import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mixing',
  templateUrl: './mixing.component.html',
  styleUrls: ['./mixing.component.css']
})
export class MixingComponent implements OnInit {

  recipe: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  newRecipe(recipe) {
    this.recipe = recipe;
  }

}
