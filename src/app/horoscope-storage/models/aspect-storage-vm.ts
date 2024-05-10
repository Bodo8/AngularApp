import { AutoMap } from '@automapper/classes';

export class AspectStorageVm {
    @AutoMap(() =>[AspectStorageDTO])
    aspectStorage: AspectStorageDTO[];

    constructor(aspectStorages: AspectStorageDTO[]) {
        this.aspectStorage = aspectStorages;
    }
}

export class AspectStorageDTO {
    @AutoMap()
    aspectStorageId: number;
    @AutoMap()
    planetFirst: string;
    @AutoMap()
    aspectName: string;
    @AutoMap()
    positiveType: boolean;
    @AutoMap()
    planetSecond: string;
    @AutoMap()
    description: string;
}