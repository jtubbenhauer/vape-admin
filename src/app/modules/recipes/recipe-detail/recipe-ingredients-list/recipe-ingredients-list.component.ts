import { AfterViewInit, Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecipesService } from 'app/data/service/recipes.service';

// https://medium.com/@muhimasri/create-an-editable-dynamic-table-using-angular-material-590fa0c26a30


@Component({
  selector: 'app-recipe-ingredients-list',
  templateUrl: './recipe-ingredients-list.component.html',
  styleUrls: ['./recipe-ingredients-list.component.css']
})
export class RecipeIngredientsListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['supplier', 'name', 'percentage', 'delete'];
  dataSource = new MatTableDataSource();
  tableData = [];

  @Input() id: string;

  @ViewChild(MatSort) sort: MatSort;


  constructor(private service: RecipesService) {
    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.service.getIngredients(this.id).subscribe(res => {
      res.map(i => {
        this.tableData.push({
          'supplier': i.payload.doc.data()['supplier'],
          'name': i.payload.doc.data()['name'],
          'percentage': i.payload.doc.data()['percentage'],
          'id': i.payload.doc.id
        })
        this.dataSource.data = this.tableData;
      });
      this.tableData = []
    });
    }

  deleteHandler(id) {
    this.service.deleteFlavourFromRecipe(this.id, id);
  }
  

}
