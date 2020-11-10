import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css']
})
export class RecipeInfoComponent implements OnInit {

  constructor() { }

  @Input() title: string;
  @Input() collection: string;

  ngOnInit(): void {
  }

}
