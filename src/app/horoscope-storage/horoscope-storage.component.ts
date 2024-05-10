import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account-service';
import { PlanetStorage, PlanetType } from './models/planet-storage';

@Component({
  selector: 'hor-horoscope-storage',
  templateUrl: './horoscope-storage.component.html',
  styles: [
  ]
})
export class HoroscopeStorageComponent implements OnInit {

  account = this.accountService.accountValue;
  planetStorage: PlanetStorage;
  showDescription: boolean;
  signDescription: string;
  showCreatePlanet: boolean;
  showCreateAspect: boolean;
  showShowAspect: boolean;
  showListPlanets: boolean;
  isSelected: boolean[] = [];
  namesPlanetNavbar: string[] = [];
  planetsType = Object.values(PlanetType);

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setSelectedNavbars();
    this.setNamesPlanetNavbar();
  }

  showListPlanet() {
    this.showListPlanets = true;
  }

  showCreatePlanets(){
    this.showCreatePlanet = true;
  }

  hideCreatePlanets(value: boolean){
    this.showCreatePlanet = value;
  }

  hideCreateAspects(value: boolean) {  
    this.showCreateAspect = value;  
    }  

  showCreateAspects(){
    this.showCreateAspect = true;
  }

  showShowAspects(){ 
    this.showShowAspect = true;
  }

  hideShowAspects(value: boolean){
    this.showShowAspect = value;
  }

  hideListPlanet(value: boolean){
    this.showListPlanets = value;
  }
  
  onSelect(planet: string) {
    this.isSelected = [];
    this.setSelectedNavbars();

    const index = this.namesPlanetNavbar.indexOf(planet)
    this.isSelected[index] = true;
  }
  setSelectedNavbars(){
    for (let i = 0; i < this.planetsType.length; i++) {
      this.isSelected.push(false);
    }
  }

  setNamesPlanetNavbar(){
    for (const planetType of Object.values(PlanetType)) {
      const name = planetType.toString();
      this.namesPlanetNavbar.push(name);
    };
  }
}