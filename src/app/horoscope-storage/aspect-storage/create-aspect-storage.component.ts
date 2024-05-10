import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/core/message.service';
import { HoroscopeNamesService } from 'src/app/horoscope-storage/horoscope-names.service';
import { PlanetsStorageService } from 'src/app/horoscope-storage/planets-storage.service';

@Component({
  selector: 'hor-create-aspect-storage',
  templateUrl: './create-aspect-storage.component.html',
  styles: [
  ]
})
export class CreateAspectStorageComponent implements OnInit {

  @Output() hideEmitter = new EventEmitter<boolean>();
  
  planetNames: string[] = [];
  aspectNames: string[] = [];
  planetFirst: string;
  planetSecond: string;
  aspectName: string;
  descriptionAspect: string;
  positiveType: boolean;

  constructor(private horoscopeNamesService: HoroscopeNamesService,
                      private messageService: MessageService,
                      private planetsStorageService: PlanetsStorageService) { }

  ngOnInit(): void {
    this.refresh();
  }

  private refresh() {
    this.horoscopeNamesService.getPlanetNames().subscribe(
      (response) => { this.planetNames = response.planetNames }
  );
    this.horoscopeNamesService.getAspectNames().subscribe(
      (response) => { this.aspectNames = response.aspectNames }
    );
  }

  hideCreateAspects(){
    this.hideEmitter.emit(false);
  }

  addAspect(form: NgForm) 
  {
    this.planetsStorageService.createAspectPlanet({
      aspectStorageId: 0,
      planetFirst: this.planetFirst,
      aspectName: this.aspectName,
      descriptionAspect: this.descriptionAspect,
      planetSecond: this.planetSecond,
      positiveType: this.positiveType
    }).subscribe(
      () => this.messageService.success("Dodano AspectStorage")
    );
   // form.resetForm();
  }
}


