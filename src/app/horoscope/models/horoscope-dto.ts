import { AspectStorage } from "src/app/horoscope-storage/models/aspect-storage";
import { PlanetDto } from "./planet-dto";

export interface HoroscopeDto {
    horoscopeId: number; 
    placeBirth: string;
    horoscopeOwner: string;
    birthOfDate: Date; 
    planetsHoroscope: PlanetDto[];
    aspectsHoroscope: AspectStorage[];
    accountId: number;

}