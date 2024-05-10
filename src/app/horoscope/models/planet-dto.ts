import { HouseStorageDTO, SignZodiacsStoreDTO } from "src/app/horoscope-storage/models/planet-storageDTO";

export interface PlanetDto {
    planetName: string; 
    placeDegree: number; 
    isRetrogradation: boolean;
    signZodiacDto: SignZodiacsStoreDTO;
    houseDto: HouseStorageDTO
}