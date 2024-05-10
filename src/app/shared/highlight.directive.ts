import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private element: ElementRef) {
  }

  isActive: boolean = false;
  elementId: any = null;

  // @HostListener('mouseenter') highlight(){
  //   this.element.nativeElement.style.backgroundColor = "orange";
  // }

  // @HostListener('mouseleave') cancelHighlight(){
  //   this.element.nativeElement.style.backgroundColor = null;
  // }

  @HostListener('click', ['$event']) highlightclick(){
    this.isActive = !this.isActive;
    if (this.isActive){

      if(this.elementId != null)
        this.elementId.style.backgroundColor = null;

      this.element.nativeElement.style.backgroundColor = "Black";
      this.elementId = this.element;
      }
  }
}
