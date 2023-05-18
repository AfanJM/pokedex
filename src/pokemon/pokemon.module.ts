import {MongooseModule} from '@nestjs/Mongoose';
import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import {Pokemon,pokemonSchema} from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    //creando el modelo
    MongooseModule.forFeature([
      {
        name:Pokemon.name,
        schema: pokemonSchema
      }
    ])
  ]
})
export class PokemonModule {}
