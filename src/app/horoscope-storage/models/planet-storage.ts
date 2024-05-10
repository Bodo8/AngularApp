
export interface PlanetStorage {

    planetName: string; // PlanetType;
    zodiacName: string; // SignZodiacType;
    descriptionSign: string;
    degreeStart: number;
    degreeEnd: number;
    descriptionPosition: string
    numberHouse: string //HouseType
    descriptionHous: string;
    exactDegree: number;
    exactDescription: string;
}

export enum PlanetType {
    SUN = 'SUN',
    MOON = 'MOON',
    MERCURY = 'MERCURY',
    VENUS = 'VENUS',
    MARS = 'MARS',
    JUPITER = 'JUPITER',
    SATURN = 'SATURN',
    URAN = 'URAN',
    NEPTUNE = 'NEPTUNE',
    PLUTOONE = 'PLUTOONE',
    ASCENDENT = 'ASCENDENT',
    DESCENDENT = 'DESCENDENT',
    MEDIUM_COELI = 'MEDIUM_COELI',
    IMMUM_COELI = 'IMMUM_COELI',
    MOONSKNOT_NORTH = 'MOONSKNOT_NORTH',
    MOONSKNOT_SOUTH = 'MOONSKNOT_SOUTH'
}