import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {isValidObjectId, Model} from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  //inyectamos depedencias. pokemonmodel es nuestra entidad
  //en este caso estamos inyectando un modelo
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>){
      
  }

  //creando el pokemon
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()
    try{
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    }catch(error){
      this.errorsException(error)
      

    }
  }
  
  async findAll() {
    const pok = await this.pokemonModel.find();
    if(!pok) throw new NotFoundException(`Pokemon not found`);
    return pok;
  }

  async findOne(busqueda: string) {
    //hacemos una referencia:
    let pok : Pokemon

    //si el id es un numero
    if(!isNaN(+busqueda))
    pok = await this.pokemonModel.findOne({ no: busqueda })

    //MongoID
    if(!pok && isValidObjectId(busqueda)){
      pok = await this.pokemonModel.findById(busqueda)
    }

    //Name
    if(!pok){
      pok = await this.pokemonModel.findOne({ name:busqueda.toLowerCase() });
    }


    if(!pok) throw new NotFoundException(`Pokemon with id, name or no "${ busqueda }" not found`)


    return pok;

  }

  async update( busqueda: string, updatePokemonDto: UpdatePokemonDto ) {
    //hacemos uso del metodo findOne -- validando la busqueda
    const pok = await this.findOne( busqueda );
    
  if(updatePokemonDto.name) 
  updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
    //guardamos la data
    await pok.updateOne( updatePokemonDto, { new:true } ); //mandamos la data y el obj nuevo

    //mi update pokemon tiene la data actualizada que quiero grabar,
    //exparsimos todas las propiedades y sobreescribimos las pro de la data actualizada
    return {...pok.toJSON(), ...updatePokemonDto}

    } catch (error) {
      this.errorsException( error ) //llamamos el manejo de errores
      
    }
    

    
  }

  async remove( id: string )  {
 
    const {deletedCount} = await this.pokemonModel.deleteOne({ _id: id });

    if(deletedCount === 0)
    throw new BadRequestException(`Pokemon with id "${ id }" not found`);

    return;

    
  }

  //manejo de errores
  private errorsException(error:any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create pokemon`)

  }
}
