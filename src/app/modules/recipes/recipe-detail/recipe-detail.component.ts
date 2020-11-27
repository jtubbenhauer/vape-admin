import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RecipesService } from 'app/data/service/recipes.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  title: string;
  collection: string;
  id: string;

  constructor(private service: RecipesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getRecipe(this.id).subscribe(res => {
      this.title = res.data().name;
      this.collection = res.data().collection;
    })
  }

  deleteHandler() {
    if(confirm('Are you sure?')) {
      this.service.deleteRecipe(this.id);
      this.router.navigate(['recipes']);
    }
  }

}
