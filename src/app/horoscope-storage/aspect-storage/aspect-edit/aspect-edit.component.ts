import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AspectSignDto } from '../../models/aspect-sign-vm';
import { AspectType } from 'src/app/core/models/aspect-type';
import { MessageService } from 'src/app/core/message.service';
import { PlanetsStorageService } from '../../planets-storage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hor-aspect-edit-storage',
  templateUrl: './aspect-edit.component.html',
  styles: [
  ]
})
export class AspectEditComponent implements OnInit {

  @Input() aspectSignDto: AspectSignDto
  @Output() hideEditAspectEmitter = new EventEmitter<boolean>();

  aspectName: string;
  aspectNames: string[] = Object.keys(AspectType);
  positiveType: boolean;
  descriptionAspect: string;

  constructor(
    private messageService: MessageService,
    private planetsStorageService: PlanetsStorageService) { }

  ngOnInit(): void {
    this.aspectName = this.aspectSignDto.aspectName;
    this.descriptionAspect = this.aspectSignDto.description;
    this.positiveType = this.aspectSignDto.positiveType;
  }

  updateAspect(form: NgForm) {
   this.planetsStorageService.updateAspectStorage({
    aspectStorageId: this.aspectSignDto.aspectStorageId,
    planetFirst: this.aspectSignDto.planetFirst,
    planetSecond: this.aspectSignDto.planetSecond,
    aspectName: this.aspectName,
    positiveType: this.positiveType,
    descriptionAspect: this.descriptionAspect
   })
   .subscribe({
    next: () => { this.messageService.success("Zaktualizowano AspectStorage")},
    error: error => {this.messageService.error("Błąd aktualizacji")}
    });
    form.reset();
    this.hideEditAspectEmitter.emit(true);
  }
}
