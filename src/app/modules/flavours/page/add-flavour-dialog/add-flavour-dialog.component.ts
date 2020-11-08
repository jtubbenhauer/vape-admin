import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../flavours.component";


@Component({
  selector: 'app-add-flavour-dialog',
  templateUrl: './add-flavour-dialog.component.html',
  styleUrls: ['./add-flavour-dialog.component.css']
})
export class AddFlavourDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<AddFlavourDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {

  }

}
