import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  collection: string;
  concentrate: number;
}


@Component({
  selector: 'app-new-recipe-dialog',
  templateUrl: './new-recipe-dialog.component.html',
  styleUrls: ['./new-recipe-dialog.component.css']
})
export class NewRecipeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewRecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
