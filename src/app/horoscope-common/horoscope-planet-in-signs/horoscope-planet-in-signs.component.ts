import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanetStorageDTO } from 'src/app/horoscope-storage/models/planet-storageDTO';
import { PlanetStorageVm } from 'src/app/horoscope/models/planet-storage-vm';

@Component({
  selector: 'hor-horoscope-planet-in-signs',
  templateUrl: './horoscope-planet-in-signs.component.html',
  styles: [
  ]
})
export class HoroscopePlanetInSignsComponent implements OnInit {

    @Input() planetStorageVm$: Observable<PlanetStorageVm>;
    planetStorageDTO: PlanetStorageDTO[];
    showEditPlanet: boolean;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
