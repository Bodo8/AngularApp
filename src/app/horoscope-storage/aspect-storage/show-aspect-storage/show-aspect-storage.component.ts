import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlanetType } from '../../models/planet-storage';
import { AccountService } from 'src/app/account/account-service';
import { PlanetsStorageService } from '../../planets-storage.service';
import { AspectSignVm, AspectSignDto } from '../../models/aspect-sign-vm';
import { AspectStorageDTO, AspectStorageVm } from '../../models/aspect-storage-vm';
import { mapper } from 'src/app/mapping/mapper';
import { SignZodiacType } from 'src/app/core/models/sign-zodiac-type';

@Component({
  selector: 'hor-app-show-aspect-storage',
  templateUrl: './show-aspect-storage.component.html',
  styles: [
  ]
})
export class ShowAspectStorageComponent implements OnInit {

  @Output() hideAspectEmitter = new EventEmitter<boolean>();

  showEditForm: boolean;
  showAspectList: boolean = true;
  planetsType = Object.values(PlanetType);
  isSelected: boolean[] = [];
  namesPlanetNavbar: string[] = [];
  aspectSignList: AspectSignVm;
  aspectStorage: AspectStorageDTO
  aspectStorageVm: AspectStorageVm;
  aspectSignDto: AspectSignDto;
  showEditPlanet: boolean;
  showDescription: boolean;

  constructor(private accountService: AccountService,
    private planetsStorageService: PlanetsStorageService) { }

  ngOnInit(): void {
    this.setSelectedNavbars();
    this.setNamesPlanetNavbar();
    this.getAspects(PlanetType.SUN);
  }

  hideListAspects() {
    this.hideAspectEmitter.emit(false);
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

  onSelect(planet: string) {
    this.isSelected = [];
    this.setSelectedNavbars();

    const index = this.namesPlanetNavbar.indexOf(planet)
    this.isSelected[index] = true;
  }

  editAspect(aspect: AspectSignDto) {
    this.aspectSignDto = aspect;
    this.showAspectList = false;
    this.showEditForm = true; 
  }

  getAspects(planet: PlanetType)
  {
    this.planetsStorageService.getAspectStorage(planet.toString()).subscribe(
      (response) => {this.aspectStorageVm = new AspectStorageVm(response.aspectStorage)}
    );
    
    const one: SignZodiacType = SignZodiacType["ARIES"];

    if (this.aspectStorageVm != undefined){
    const dto = mapper.map(this.aspectStorageVm.aspectStorage[0], AspectStorageDTO, AspectSignDto)
    this.showEditPlanet = false;
  }
    // this.aspectSignList.aspectStorage = this.aspectSignDto;
      this.showEditPlanet = false; 
  }

  hideEditForm(value: boolean){
    this.showEditForm = false;
  }
}

