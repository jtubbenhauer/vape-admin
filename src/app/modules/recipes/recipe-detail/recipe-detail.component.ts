import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RecipesService } from 'app/data/service/recipes.service';
import { Router } from "@angular/router";
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  title: string;
  collection: string;
  concentrate: number;
  id: string;

  constructor(private service: RecipesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');    
    this.service.getRecipe(this.id).subscribe(res => {
      this.title = res.data().name;
      this.collection = res.data().collection;
      this.concentrate = res.data().concentrate;
    })
  }

  deleteHandler() {
    if(confirm('Are you sure?')) {
      this.service.deleteRecipe(this.id);
      this.router.navigate(['admin/recipes']);
    }
  }

  saveButton() {
    this.service.saveRecipe(this.id);
  }

}
