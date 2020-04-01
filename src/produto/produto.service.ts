import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, TransactionRepository, createQueryBuilder, TransactionManager, EntityManager, Transaction } from 'typeorm';
import { Usuario } from 'src/entity/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/entity/produto.entity';


@Injectable()
export class ProdutoService {

  constructor(
    @InjectRepository(Produto) private readonly produtoRepository : Repository<Produto>
  ) {}

    retorna_filtragem(filtros){

        let where = [];
        let parametros = {};

        if(filtros.nome){
            where.push('produto.nome ilike :nome');
            parametros['nome'] = `%${filtros.nome}%`;
        }

        if(filtros.preco_maximo){
            where.push('produto.preco > :preco_maximo');
            parametros['preco_maximo'] = filtros.preco_maximo;
        }

        if(filtros.preco_minimo){
            where.push('produto.preco > :preco_minimo');
            parametros['preco_minimo'] = filtros.preco_minimo;
        }


        return {filtro_completo : where.join(' and'), parametros : parametros}

    }


    async getProdutos(filtros : Object){

        const {filtro_completo, parametros} = this.retorna_filtragem(filtros);

        return await this.produtoRepository.createQueryBuilder('produto')
                                            .select('produto.id , produto.nome, produto.preco')
                                            .where(filtro_completo, parametros)
                                            .getRawMany();
    } 

    async getProduto(id : number){

        return await this.produtoRepository.findOne(id);
    }

}

 