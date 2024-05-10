import { Component } from '@angular/core';
import { HoroscopeService } from '../horoscope-service';
import { AspectStorageVm } from 'src/app/horoscope-storage/models/aspect-storage-vm';
import { AspectParameters } from '../models/aspect-query';
import { PlanetType } from 'src/app/horoscope-storage/models/planet-storage';
import { AspectType } from 'src/app/core/models/aspect-type';
import { NgForm } from '@angular/forms';
import { PlanetParameters, PlanetHoroscopeQuery } from '../models/planet-horoscope-query';
import { SignZodiacType } from 'src/app/core/models/sign-zodiac-type';
import { HouseType } from 'src/app/core/models/house-type';
import { PlanetStorageVm } from '../models/planet-storage-vm';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account-service';
import { HoroscopeParameterDto } from '../models/horoscope-parameter-dto';
import { MessageService } from 'src/app/core/message.service';
import { PositiveAspects } from '../models/positive-aspects';
import { first } from 'rxjs/operators';

@Component({
  selector: 'hor-horoscope-create',
  templateUrl: './horoscope-create.component.html',
  styles: [
  ]
})
export class HoroscopeCreateComponent {

  aspectStorageVm: AspectStorageVm;
  aspectParameter: AspectParameters;
  aspectParameters: AspectParameters[] = [];
  planetTypes: string[] = Object.values(PlanetType);
  aspectTypes: string[] = Object.values(AspectType);
  planetFirst: string
  planetSecond: string
  selectedAspectName: string
  loading: boolean;
  aspectName: AspectType;
  isAnyAspectParameters: boolean;
  planetStorageVm$: Observable<PlanetStorageVm>;
  planetParameters: PlanetParameters[] = [];
  planetHoroscopeQuery: PlanetHoroscopeQuery;
  isAnyPlanetParameter: boolean;
  signTypes: string[] = Object.values(SignZodiacType);
  signName: SignZodiacType;
  planetSignTypes: string[] = Object.values(PlanetType);
  planetName: PlanetType;
  selectedPlanetName: string;
  selectedSign: string;
  numberDegree: number;
  selectedHouse: string;
  numberToSelect: number[] = Array.from(Array(30).keys());
  houseTypes: string[] = Object.values(HouseType);
  houseName: string;
  showAspects: boolean;
  showPlanets: boolean;
  isRetrograde: string = "No";
  birthPlace: string;
  dateBirth: Date;
  selectedTime: string;
  horoscopeOwner: string;;

  constructor(private horoscopeService: HoroscopeService,
              private accountService: AccountService,
              private messageService: MessageService) { }

  account = this.accountService.accountValue;

  addAspects(form: NgForm) 
  {
    const positiveType = this.checkAspect(this.selectedAspectName)
    const parameter: AspectParameters = {
      planetFirst: PlanetType[this.planetFirst],
      aspectName: AspectType[this.selectedAspectName],
      planetSecond: PlanetType[this.planetSecond],
      positiveType: positiveType
    }
    this.aspectParameters.push(parameter);

    if(this.aspectParameters.length > 0){
       this.isAnyAspectParameters = true;
    }
  }

  addHoroscope(form: NgForm) {
    const year = this.dateBirth.getFullYear();
    const month = (this.dateBirth.getMonth());
    const day = this.dateBirth.getDate();
    const [hours, minutes] = this.selectedTime.split(':');
    const combinedDateTime: Date = new Date(+year, +month, +day, +hours, +minutes, 0);
   
    const horoscope: HoroscopeParameterDto = 
    {
      birthOfDate: combinedDateTime, 
      placeBirth: this.birthPlace,
      horoscopeOwner: this.horoscopeOwner,
      planetsHoroscope: this.planetParameters,
      aspectsHoroscope: this.aspectParameters,
      horoscopeId: 0,
      accountId: 0
    };

    this.horoscopeService.createHoroscope(this.account.id, horoscope)
    .pipe(first())
    .subscribe({
        next: () => {
            this.messageService.success('Horoscope created successfully');
            form.reset();
        },
        error: error => {
            this.messageService.error("Something went wrong by add horoscope " + error);
        }
    });
  }

  addPlanet(form: NgForm)
  {

    const parameter: PlanetParameters = {
      planetName: PlanetType[this.selectedPlanetName],
      zodiacName: SignZodiacType[this.selectedSign],
      placeDegree: this.numberDegree,
      houseNumber: HouseType[this.selectedHouse],
      isRetrogradation: this.isRetrograde == "No" ? false : true
    }
    this.planetParameters.push(parameter);

    if (this.planetParameters.length > 0){
      this.isAnyPlanetParameter = true;
    }
  }

  getPlanetInSigns() {
    this.loading = true;
    if (this.planetParameters.length > 0) 
    {
      this.showPlanets = true;
      this.showAspects = false;
      this.planetHoroscopeQuery = {
      parameters: this.planetParameters
      };
      this.planetStorageVm$ = this.horoscopeService.getPlanetInSigns(this.planetHoroscopeQuery)
    }
    this.planetParameters = [];
    this.isAnyPlanetParameter = false;
    this.loading = false;
  }

  getPlanetAspects() {
    this.loading = true;
    
    if (this.aspectParameters.length > 0)
    {
    this.horoscopeService.getPlanetAspects(this.aspectParameters).subscribe(
      (response) => {this.aspectStorageVm = new AspectStorageVm(response.aspectStorage)}
    );
  }
    this.aspectParameters = [];
    this.isAnyAspectParameters = false;
    this.loading = false;
    this.showPlanets = false;
    this.showAspects = true;
  }

  checkAspect(aspectName: string): boolean
  {
      const signTypes: string[] = Object.values(PositiveAspects);
      return signTypes.includes(aspectName)
  }
}


