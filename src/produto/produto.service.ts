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

    async getProdutos(){
        return await this.produtoRepository.find();
    } 

}

 