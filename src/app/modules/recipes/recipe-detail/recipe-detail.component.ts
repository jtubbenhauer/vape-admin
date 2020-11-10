import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RecipesService } from 'app/data/service/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  title: string;
  collection: string;
  id: string;

  constructor(private service: RecipesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getRecipe(this.id).subscribe(res => {
      this.title = res.data().name;
      this.collection = res.data().collection;
    })
  }

}
