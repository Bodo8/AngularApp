
export interface PlanetStorageDTO {

    planetStorageId: number;
    planetName: string; 
    signZodiacsStore: SignZodiacsStoreDTO[];
    housesStorage: HouseStorageDTO[];
}

export interface SignZodiacsStoreDTO {

    signZodiacStorageId: number;
    zodiacName: string;
    description: string;
    exactPositions: ExactPositionDTO[];
    positionInSign: PositionInSignStorageDTO[]
}

export interface PositionInSignStorageDTO {
    positionId: number;
    degreeStart: number;
    degreeEnd: number;
    descriptionPosition: string;
}

export interface ExactPositionDTO {
    exactPositionId: number;
    exactDegree: number;
    exactDescription: string;
}

export interface HouseStorageDTO {
    houseId: number;
    numberHouse: string;
    description: string;
}