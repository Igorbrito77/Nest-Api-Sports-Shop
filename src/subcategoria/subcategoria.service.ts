import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, TransactionRepository, createQueryBuilder, TransactionManager, EntityManager, Transaction } from 'typeorm';
import { Usuario } from 'src/entity/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/entity/categoria.entity';
import { Subcategoria } from 'src/entity/subcategoria.entity';


@Injectable()
export class SubcategoriaService {

  constructor(
    @InjectRepository(Subcategoria) private readonly subcategoriaRepository : Repository<Subcategoria>
  ) {}


    async list(){
        return await this.subcategoriaRepository.find();
    } 

  

}

 