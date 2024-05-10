import { PlanetParameters } from './planet-horoscope-query'
import { AspectParameters } from './aspect-query'

export interface HoroscopeParameterDto {

    horoscopeId: number; 
    birthOfDate: Date;
    horoscopeOwner: string;
    placeBirth: string;
    planetsHoroscope: PlanetParameters[];
    aspectsHoroscope: AspectParameters[];
    accountId: number;
}

export interface HoroscopeParametersVm {
    horoscopeParameters: HoroscopeParameterDto[];
}