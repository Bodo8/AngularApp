import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MessageService } from 'src/app/core/message.service';
import { HoroscopeNamesService } from 'src/app/horoscope-storage/horoscope-names.service';
import { PlanetStorage } from 'src/app/horoscope-storage/models/planet-storage';
import { PlanetsStorageService } from 'src/app/horoscope-storage/planets-storage.service';

@Component({
  selector: 'hor-create-planet-storage',
  templateUrl: './create-planet-storage.component.html',
  styles: [
  ]
})
export class CreatePlanetStorageComponent implements OnInit {

  @Output() hidePlanetEmitter = new EventEmitter<boolean>();
  
  planetNames: string[] = [];
  zodiacNames: string[] = [];
  houseNames: string[] = [];
  planetStorage: PlanetStorage;
  planetName: string;
  zodiacName: string;
  descriptionSign: string;
  degreeStart: number;
  degreeEnd: number;
  descriptionPositionAdd: string
  numberHouse: string
  descriptionHous: string;
  exactDegree: number;
  exactDescription: string;

  constructor(private messageService: MessageService,
    private planetsStorageService: PlanetsStorageService,
    private horoscopeNamesService: HoroscopeNamesService) { }

  ngOnInit(): void {
    this.horoscopeNamesService.getPlanetNames().subscribe(
      (response) => { this.planetNames = response.planetNames }
  );
  this.horoscopeNamesService.getZodiacNames().subscribe(
    (response) => { this.zodiacNames = response.zodiacNames }
  );
  this.horoscopeNamesService.getHouseNames().subscribe(
    (response) => { this.houseNames = response.houseNames }
  );
  }

  hideCreatePlanets(){
    this.hidePlanetEmitter.emit(false);
  }

  addPlanet(form: NgForm) 
  {
    this.planetsStorageService.createPlanetStorage({
      planetName: this.planetName,
      zodiacName: this.zodiacName,
      descriptionSign: this.descriptionSign,
      degreeStart: this.degreeStart,
      degreeEnd: this.degreeEnd,
      descriptionPosition: this.descriptionPositionAdd,
      numberHouse: this.numberHouse,
      descriptionHous: this.descriptionHous,
      exactDegree: this.exactDegree,
      exactDescription: this.exactDescription
    })
    .pipe(first())
    .subscribe({
        next: () => {
            this.messageService.success('Account created successfully');
        },
        error: error => {
            this.messageService.error("Something went wrong by add account" + error);
        }
    });
  }
}
