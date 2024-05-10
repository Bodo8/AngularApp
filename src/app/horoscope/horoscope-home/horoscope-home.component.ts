import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account-service';
import { HoroscopeService } from '../horoscope-service';
import { HoroscopeParameterDto } from '../models/horoscope-parameter-dto';
import { HoroscopeDto } from '../models/horoscope-dto';
import { HoroscopeQuery } from '../models/horoscope-query';

@Component({
  selector: 'hor-horoscope-home',
  templateUrl: './horoscope-home.component.html',
  styles: [
  ]
})
export class HoroscopeHomeComponent implements OnInit {

  
horoscopeParameters: HoroscopeParameterDto[];
horoscopeDescription: HoroscopeDto;
isParameters: boolean;
showPlanets: boolean;
showHoroscope: boolean;
iconEyePath: string = 'assets/icons/eye-svgrepo-com.svg';

  constructor(private horoscopeService: HoroscopeService,
    private accountService: AccountService) { }

  account = this.accountService.accountValue;

  ngOnInit(): void {
    this.getParameters();
    this.isParameters = this.horoscopeParameters?.length > 0;
  }

  getParameters()
  {
    this.horoscopeService.getParametersHoroscope(this.account.id).subscribe(
      (response) => {this.horoscopeParameters = response.horoscopeParameters}
    );
  }

  showHoroscopeDescription(horoscopeId: number){
    const query: HoroscopeQuery = {
      horoscopeParameterId: horoscopeId,
      accountId: this.account.id
    }
    this.horoscopeService.getHoroscope(this.account.id, query).subscribe(
      (response) => {this.horoscopeDescription = response}
    );
  this.showPlanets = false;
  this.showHoroscope = true;
  }

  showPlanetsList(){
    this.showPlanets = !this.showPlanets;
  }
}
