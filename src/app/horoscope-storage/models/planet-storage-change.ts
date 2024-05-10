import { PositionInSignStorageDTO, ExactPositionDTO, HouseStorageDTO, SignZodiacsStoreDTO } from "./planet-storageDTO";

export interface PlanetStorageChange {
    planetName: string; 
    planetStorageId: number;
    signZodiacStorageDto: SignZodiacsStoreDTO;
    housesStorage: HouseStorageDTO[];
}