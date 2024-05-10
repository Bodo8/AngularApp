import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlanetType } from 'src/app/horoscope-storage/models/planet-storage';
import { PlanetStorageChange } from 'src/app/horoscope-storage/models/planet-storage-change';
import { ExactPositionDTO, HouseStorageDTO, PlanetStorageDTO, PositionInSignStorageDTO, SignZodiacsStoreDTO } from 'src/app/horoscope-storage/models/planet-storageDTO';
import { PlanetsStorageService } from 'src/app/horoscope-storage/planets-storage.service';

@Component({
  selector: 'hor-planets-in-signs',
  templateUrl: './planets-in-signs.component.html',
  styles: [
  ]
})
export class PlanetsInSignsComponent implements OnInit {

  @Output() hidePlanetsEmitter = new EventEmitter<boolean>();
  
  showListPlanets: boolean;
  isSelected: boolean[] = [];
  namesPlanetNavbar: string[] = [];
  planetsType = Object.values(PlanetType);
  planetStorageDTO: PlanetStorageDTO;
  showEditPlanet: boolean;
  planetStorageData: PlanetStorageChange;
  showEditForm: boolean;
  houseStorages: HouseStorageDTO[] = [];
  showPlanetsList: boolean = true;
  
  constructor(private planetsStorageService: PlanetsStorageService) { }

  ngOnInit(): void {
    this.setSelectedNavbars();
    this.setNamesPlanetNavbar();
    this.getPlanets(PlanetType.SUN);
  }

  hideListPlanet() {
    this.hidePlanetsEmitter.emit(false);
  }

  showListPlanet(){
    this.showListPlanets = true;
  }

  hideEditForm(value: boolean){
    this.showEditForm = value;
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

  getPlanets(planet: PlanetType)
  {
    this.planetsStorageService.getPlanetStorage(planet.toString()).subscribe(
      (response) => { this.planetStorageDTO = response, this.houseStorages = response.housesStorage}
    );
      this.showEditPlanet = false; 
  }

  editPlanet(signsZodiac: SignZodiacsStoreDTO, houseStorage: HouseStorageDTO[]) {
    let positionInSignUpdate: PositionInSignStorageDTO[] = [];

    for (let position of signsZodiac.positionInSign){
        let positionElement: PositionInSignStorageDTO = {
          positionId: 0,
          descriptionPosition: position.descriptionPosition,
          degreeStart: position.degreeStart,
          degreeEnd: position.degreeEnd 
        }
      positionInSignUpdate.push(positionElement)
    }

    let exactPositins: ExactPositionDTO[] = [];
    for (let exact of signsZodiac.exactPositions){
         let exactOne: ExactPositionDTO = {
          exactPositionId: 0,
          exactDegree: exact.exactDegree,
          exactDescription: exact.exactDescription
         }
         exactPositins.push(exactOne);
    }
    this.planetStorageData = {
      planetName: this.planetStorageDTO.planetName,
      planetStorageId: this.planetStorageDTO.planetStorageId,
      signZodiacStorageDto: signsZodiac,
      housesStorage: houseStorage
    }
    this.showPlanetsList = false;
    this.showEditForm = true; 
  }
}
