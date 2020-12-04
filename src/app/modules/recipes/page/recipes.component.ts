import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipesService } from 'app/data/service/recipes.service';
import { NewRecipeDialogComponent } from './new-recipe-dialog/new-recipe-dialog.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  name: string;
  collection: string;
  concentrate: number = 0;

  constructor(public dialog: MatDialog, private service: RecipesService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewRecipeDialogComponent, {
      width: '250px',
      data: {name: this.name, collection: this.collection, concentrate: this.concentrate}
    });

    dialogRef.afterClosed().subscribe(res => {
      this.service.addRecipeAndRedirect(res.name, res.collection, res.concentrate);
    })
  }

  ngOnInit(): void {
  }

}
