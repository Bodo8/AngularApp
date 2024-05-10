import { HouseType } from "src/app/core/models/house-type";
import { SignZodiacType } from "src/app/core/models/sign-zodiac-type";
import { PlanetType } from "src/app/horoscope-storage/models/planet-storage";

export interface PlanetHoroscopeQuery {
    parameters: PlanetParameters[];
}

export interface PlanetParameters {
    planetName: PlanetType;
    zodiacName: SignZodiacType;
    placeDegree: number;
    houseNumber: HouseType;
    isRetrogradation: boolean;
}