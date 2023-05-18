import { join } from 'path'; //core de node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';


@Module({
  //importamos el servidor estatico para la vista(public)
  imports: [
      ServeStaticModule.forRoot({
        rootPath: join(__dirname,'..','public')
      }),
      //conectamos la bd con mongoose 
      MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon') ,
      //
      PokemonModule,
      CommonModule
  ]
 
})
export class AppModule {}
