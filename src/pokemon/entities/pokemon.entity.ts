import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';


//como nosotros queremos guardar en la db
@Schema()
export class Pokemon extends Document { //extendemos document para trabajar con mongoose de una manera
                                        //facil
    
    //nombre del pokemon
    //propiedades
    @Prop({
        unique: true,
        index: true,
    })
    name:string;
    
    @Prop({
        unique: true,
        index: true,
    })
    no:number;
}

//exportamos el esquema
export const pokemonSchema = SchemaFactory.createForClass(Pokemon);