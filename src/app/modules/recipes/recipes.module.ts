import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './page/recipes.component';
import { SharedModule } from 'app/shared/shared.module';
import { RecipeListComponent } from './page/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeInfoComponent } from './recipe-detail/recipe-info/recipe-info.component';
import { RecipeIngredientsListComponent } from './recipe-detail/recipe-ingredients-list/recipe-ingredients-list.component';
import { NewRecipeDialogComponent } from './page/new-recipe-dialog/new-recipe-dialog.component';
import { AddFlavourComponent } from './recipe-detail/add-flavour/add-flavour.component';


@NgModule({
  declarations: [RecipesComponent, RecipeListComponent, RecipeDetailComponent, RecipeInfoComponent, RecipeIngredientsListComponent, NewRecipeDialogComponent, AddFlavourComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule
  ],
  entryComponents: [
    NewRecipeDialogComponent
  ]
})
export class RecipesModule { }
