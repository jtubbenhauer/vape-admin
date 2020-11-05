import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-add-supplier-dialog',
  templateUrl: './add-supplier-dialog.component.html',
  styleUrls: ['./add-supplier-dialog.component.css']
})
export class AddSupplierDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddSupplierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
