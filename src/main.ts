import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { mapper } from './app/mapping/mapper';
import { AspectType } from './app/core/models/aspect-type';
import { AspectSignDto } from './app/horoscope-storage/models/aspect-sign-vm';
import { AspectStorageDTO } from './app/horoscope-storage/models/aspect-storage-vm';
import { PlanetType } from './app/horoscope-storage/models/planet-storage';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  createMap(mapper
    ,AspectStorageDTO
    ,AspectSignDto
    ,forMember((destination) => destination.planetFirst,
          mapFrom((source) => PlanetType[source.planetFirst]))
      ,forMember((destination) => destination.planetSecond,
          mapFrom((source) => PlanetType[source.planetSecond]))
      ,forMember((destination) => destination.aspectName,
          mapFrom((source) => AspectType[source.aspectName]))
    );
