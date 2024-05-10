import { AspectType } from "src/app/core/models/aspect-type"
import { PlanetType } from "src/app/horoscope-storage/models/planet-storage"

export interface AspectQuery {

    parameters: AspectParameters[];
}

export interface AspectParameters {
    planetFirst: PlanetType;
    aspectName: AspectType;
    planetSecond: PlanetType;
    positiveType: boolean;
}