import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LayoutModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LayoutModule,
    FormsModule
  ]
})
export class SharedModule { }
