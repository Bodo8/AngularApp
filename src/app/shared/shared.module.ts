import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CapitalizePipe} from "./capitalize.pipe";
import {HighlightDirective} from "./highlight.directive";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
      CapitalizePipe,
      HighlightDirective
  ],
  imports: [
    CommonModule,
      FormsModule
  ],
  exports: [
      CommonModule,
      FormsModule,
      CapitalizePipe,
      HighlightDirective
  ]
})
export class SharedModule { }
