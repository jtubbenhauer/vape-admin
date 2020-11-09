import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './page/recipes.component';
import { SharedModule } from 'app/shared/shared.module';
import { RecipeListComponent } from './page/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';


@NgModule({
  declarations: [RecipesComponent, RecipeListComponent, RecipeDetailComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule { }
