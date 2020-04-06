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
   
        return await this.subcategoriaRepository.createQueryBuilder('subcategoria')
                                                .select('subcategoria.id, subcategoria.nome, categoria.nome as categoria')
                                                .innerJoin('subcategoria.categoria', 'categoria')
                                                .getRawMany();
    } 


    async get (id : number){

      return await this.subcategoriaRepository.createQueryBuilder('subcategoria')
                                              .select(`subcategoria.id, subcategoria.nome, categoria.nome as categoria, 
                                              array_agg(json_build_object('id', produto.id, 'nome', produto.nome)) as produtos`)
                                              .innerJoin('subcategoria.categoria', 'categoria')
                                              .leftJoin('subcategoria.produto', 'produto')
                                              .where('subcategoria.id = :id', {id})
                                              .groupBy('subcategoria.id,  subcategoria.nome, categoria.nome')
                                              .getRawOne();
    }


    @Transaction()
    async create(subcategoriaBody, @TransactionManager() manager: EntityManager, 
                                   @TransactionRepository(Categoria) categoriaRepository : Repository<Categoria>){

        const categoria = await categoriaRepository.findOne(subcategoriaBody.categoria_id);

       if(!categoria){
          throw new NotFoundException({mensagem : `categoria_id ${subcategoriaBody.categoria_id} inválido.`});
       }

        const subcategoria = await manager.save(new Subcategoria(subcategoriaBody));

        return subcategoria;

    }

}

 