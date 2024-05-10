import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HoroscopeNamesService } from "./horoscope-names.service";
import { HoroscopeStorageComponent } from "./horoscope-storage.component";
import { PlanetsStorageService } from "./planets-storage.service";
import { CreatePlanetStorageComponent } from './planet-storage/create-planet-storage/create-planet-storage/create-planet-storage.component';
import { StorageRoutingModule } from "./storage-routing.module";
import { CreateAspectStorageComponent } from './aspect-storage/create-aspect-storage.component';
import { ShowAspectStorageComponent } from './aspect-storage/show-aspect-storage/show-aspect-storage.component'
import { HoroscopeCommonModule } from "../horoscope-common/horoscope-common.module";
import { AspectEditComponent } from './aspect-storage/aspect-edit/aspect-edit.component';


@NgModule({
    declarations: [
        HoroscopeStorageComponent,
        CreateAspectStorageComponent,
        CreatePlanetStorageComponent,
        ShowAspectStorageComponent,
        AspectEditComponent,
    ],
    providers: [
        HoroscopeNamesService,
        PlanetsStorageService,
        CreateAspectStorageComponent
    ],
    imports: [
        SharedModule,
        StorageRoutingModule,
        HoroscopeCommonModule,
    ],
    exports: [
        HoroscopeStorageComponent,
        CreateAspectStorageComponent
    ]
  })
  
export class StorageModule{}