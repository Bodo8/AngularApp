import { SignZodiacType } from '../../core/models/sign-zodiac-type';
import { AspectType } from '../../core/models/aspect-type';
import { AutoMap } from '@automapper/classes';


export class AspectSignVm {
    @AutoMap(()=>[AspectSignDto])
    aspectStorage: AspectSignDto[];
}

export class AspectSignDto {
    @AutoMap()
    aspectStorageId: number;
    @AutoMap()
    planetFirst: SignZodiacType;
    @AutoMap()
    aspectName: AspectType;
    @AutoMap()
    positiveType: boolean;
    @AutoMap()
    planetSecond: SignZodiacType;
    @AutoMap()
    description: string;
}



