import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlanetsInSignsComponent } from "./planets-in-signs/planets-in-signs.component";
import { HoroscopePlanetInSignsComponent } from './horoscope-planet-in-signs/horoscope-planet-in-signs.component';
import { EditPlanetStorageComponent } from "./planets-in-signs/edit-planet-storage/edit-planet-storage.component";


@NgModule({
    declarations: [
      PlanetsInSignsComponent,
      HoroscopePlanetInSignsComponent,
      EditPlanetStorageComponent,
    ],
    imports: [
      FormsModule,
      CommonModule
    ],
    providers: [
    ],
    exports: [
        PlanetsInSignsComponent,
        HoroscopePlanetInSignsComponent,
        EditPlanetStorageComponent,
    ]
  })
  export class HoroscopeCommonModule { }