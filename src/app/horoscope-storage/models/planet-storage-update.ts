import { SignZodiacsStoreDTO, HouseStorageDTO, PositionInSignStorageDTO, ExactPositionDTO } from "./planet-storageDTO";

export interface PlanetStorageUpdate {

    planetStorageId: number;
    signZodiacStorageId: number;
    zodiacName: string;
    description: string;
    positionInSign: PositionInSignStorageDTO[]
    exactPositions: ExactPositionDTO[];
    housesStorage: HouseStorageDTO[];
}