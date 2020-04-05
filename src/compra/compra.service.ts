import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository, TransactionRepository, Transaction, TransactionManager, EntityManager } from "typeorm";
import { Compra } from "src/entity/compra.entity";
import { Usuario } from "src/entity/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "src/entity/produto.entity";
import { CompraProduto } from "src/entity/compra_produto.entity";

const crypto = require('crypto');

@Injectable()
export class CompraService{

    constructor( @InjectRepository(Compra)  private readonly compraRepository : Repository<Compra>){

    }

    async listCompra(usuario_id){


        return await this.compraRepository.createQueryBuilder('compra')
        .select(`compra.id, compra.codigo, compra.data, compra.finalizada, SUM(produto.preco) as valor_total,
                array_agg(json_build_object('preco', produto.preco , 'quantidade', compra_produto.quantidade, 
                    'produto', produto.nome )) AS itens`)
                                            .innerJoin('compra.compras_produto', 'compra_produto')   
                                            .innerJoin('compra_produto.produto', 'produto')
                                            .where(`compra.usuario_id =  ${usuario_id}`)                                         
                                            .groupBy('compra.id')
                                            .getRawMany();
                                            
    }


    @Transaction()
    async createCompra(usuario_id, compraBody, @TransactionManager() manager: EntityManager, 
                                                @TransactionRepository(Usuario) usuarioRepository: Repository<Usuario>,
                                                @TransactionRepository(Produto) produtoRepository: Repository<Produto>,
                                                @TransactionRepository(CompraProduto) compraProdutoRepository: Repository<CompraProduto>){

    
       const usuario = await usuarioRepository.findOne(usuario_id);
       

       if(!usuario){
           throw new NotFoundException({mensagem : 'usuario_id inválido'});           
       }

       for(let item of compraBody.items){
            const produto = await produtoRepository.findOne(item.produto_id);

            if(!produto){
                throw new NotFoundException( {mensagem: `produto_id ${item.produto_id} inválido`});                
            }
       }

       const data = (await manager.query(`select now()`))[0].now;

       const codigo = crypto.randomBytes(20).toString('HEX');   
        
       const compra = await this.compraRepository.save({
                                                            data : data,
                                                            codigo : codigo,
                                                            finalizada: false,
                                                            usuario_id: usuario_id
                                                        });
      
        compraBody.items.map((item) =>{
            item.compra_id = compra.id
        });

  
        await compraProdutoRepository.createQueryBuilder()
                                    .insert()
                                    .into(CompraProduto)
                                    .values(compraBody.items)
                                    .execute();
       
        return compra;
    }

    @Transaction()
    async finalizarCompra(id : number,  @TransactionManager() manager: EntityManager){

      
        const compra = await this.compraRepository.findOne({where : {id : id}});

        if(!compra){
           throw new NotFoundException({mensagem : 'compra_id inválido'});
        }
    
        compra.data =  (await manager.query(`select now()`))[0].now;
        compra.finalizada = true;
    
        await this.compraRepository.save(compra);

        return 'Compra finalizada com sucesso.';
        
    }




}