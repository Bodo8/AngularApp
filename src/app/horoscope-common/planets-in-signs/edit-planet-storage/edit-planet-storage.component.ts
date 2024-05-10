import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/core/message.service';
import { PositionInSignStorageDTO, ExactPositionDTO } from '../../../horoscope-storage/models/planet-storageDTO';
import { PlanetsStorageService } from '../../../horoscope-storage/planets-storage.service';
import { PlanetStorageUpdate } from '../../../horoscope-storage/models/planet-storage-update';
import { PlanetStorageChange } from '../../../horoscope-storage/models/planet-storage-change';

@Component({
  selector: 'hor-edit-planet-storage',
  templateUrl: './edit-planet-storage.component.html',
  styles: [
  ]
})
export class EditPlanetStorageComponent implements OnInit {

  @Input() planetStorageIn: PlanetStorageChange;
  @Output() hideEditFormEmitter = new EventEmitter<boolean>();

  constructor(
    private messageService: MessageService,
    private planetsStorageService: PlanetsStorageService) { }

    ngOnInit(): void {
    }
    
  editPlanetSign() {
    let size = this.planetStorageIn.signZodiacStorageDto.positionInSign.length;

    if (size < 3) {
      for (let i = 0; i < 3 - size; i++) {
        let position: PositionInSignStorageDTO = {
          positionId: 0,
          degreeStart: 1,
          degreeEnd: 10,
          descriptionPosition: "opis"
        };
        this.planetStorageIn.signZodiacStorageDto.positionInSign.push(position)
      };
    }

    if (this.planetStorageIn.signZodiacStorageDto.exactPositions.length == null
           || this.planetStorageIn.signZodiacStorageDto.exactPositions.length == 0){
            let exactPositons: ExactPositionDTO[] = [{
              exactPositionId: 0,
              exactDegree: 0,
              exactDescription: "Opis."
            }]
            this.planetStorageIn.signZodiacStorageDto.exactPositions = exactPositons;
           }
  }

  updateSignPlanet(editSignForm: NgForm) 
  {
    let positionInSignUpdate: PositionInSignStorageDTO[] = [];

    for (let position of this.planetStorageIn.signZodiacStorageDto.positionInSign){
        let positionElement: PositionInSignStorageDTO = {
          positionId: 0,
          descriptionPosition: position.descriptionPosition,
          degreeStart: position.degreeStart,
          degreeEnd: position.degreeEnd 
        }
      positionInSignUpdate.push(positionElement)
    }

    let exactPositins: ExactPositionDTO[] = [];
    for (let exact of this.planetStorageIn.signZodiacStorageDto.exactPositions){
         let exactOne: ExactPositionDTO = {
          exactPositionId: 0,
          exactDegree: exact.exactDegree,
          exactDescription: exact.exactDescription
         }
         exactPositins.push(exactOne);
    }
    let planetStorage: PlanetStorageUpdate = {
      planetStorageId: this.planetStorageIn.planetStorageId,
      signZodiacStorageId: this.planetStorageIn.signZodiacStorageDto.signZodiacStorageId,
      zodiacName: this.planetStorageIn.signZodiacStorageDto.zodiacName,
      description: this.planetStorageIn.signZodiacStorageDto.description,
      positionInSign: positionInSignUpdate,
      exactPositions: exactPositins,
      housesStorage: this.planetStorageIn.housesStorage
    }

    this.saveChanges(planetStorage);
    this.hideEditFormEmitter.emit(false);
  }

  cancelEdit() {
    this.hideEditFormEmitter.emit(false);
  }

  saveChanges(planetStorage: PlanetStorageUpdate) {
     this.planetsStorageService.updatePlanetStorage(planetStorage)
   .subscribe({
     next: () => { this.messageService.success("Zaktualizowano SignZodiac")},
     error: error => {
      this.messageService.error("Błąd aktualizacji");
  }
});
    this.hideEditFormEmitter.emit(true);
  }
}


