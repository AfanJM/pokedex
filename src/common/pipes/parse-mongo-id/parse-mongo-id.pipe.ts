import { ArgumentMetadata, BadGatewayException, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata) {
    //console.log({value,metadata})
    //validando que sea un mongoId
    if(!isValidObjectId(value)){

      throw new BadRequestException(`${value} is not valid MongoId`)
    }

    //si lo es, retorna el valor
    return value;
  }
}
