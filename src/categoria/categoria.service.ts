import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, TransactionRepository, createQueryBuilder, TransactionManager, EntityManager, Transaction } from 'typeorm';
import { Usuario } from 'src/entity/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/entity/categoria.entity';


@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(Categoria) private readonly categoriaRepository : Repository<Categoria>
  ) {}


    async list(){
        return await this.categoriaRepository.createQueryBuilder('categoria')
                                              .select(`categoria.id, categoria.nome, 
                                                array_agg(json_build_object('id', subcategoria.id, 'nome', subcategoria.nome) ORDER BY subcategoria.id )  AS subcategorias`)
                                              .innerJoin('categoria.subcategorias', 'subcategoria')
                                              .groupBy('categoria.id')
                                              .getRawMany();
    } 

  

}

 