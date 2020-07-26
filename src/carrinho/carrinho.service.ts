import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository, TransactionRepository, Transaction, TransactionManager, EntityManager } from "typeorm";
import { Compra } from "src/entity/compra.entity";
import { Usuario } from "src/entity/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "src/entity/produto.entity";
import { CompraProduto } from "src/entity/compra_produto.entity";

const crypto = require('crypto');

@Injectable()
export class CarrinhoService{

    constructor( @InjectRepository(Compra)  private readonly compraRepository : Repository<Compra>
                ){

    }

    @Transaction()
    async getCarrinho(usuario_id,  
                    @TransactionRepository(Usuario) usuarioRepository : Repository<Usuario>){

        const perfil_id = (await usuarioRepository.findOne(usuario_id)).perfil_id;

        let filtro = '';
        let parametros = {};

       // if(perfil_id !== 1){
            filtro = 'compra.usuario_id = :usuario_id ';
            parametros['usuario_id'] = usuario_id;
      //  }

        return await this.compraRepository.createQueryBuilder('compra')
                                            .select(`compra.id, compra.data,  SUM(produto.preco * compra_produto.quantidade) as valor_total,
                                                    array_agg(json_build_object('preco', produto.preco , 'quantidade', compra_produto.quantidade, 
                                                        'nome', produto.nome, 'foto_url', produto.foto_url, 'id', produto.id )) AS produtos`)
                                            .innerJoin('compra.compras_produto', 'compra_produto')   
                                            .innerJoin('compra_produto.produto', 'produto')                                            
                                            .where(filtro, parametros)                                            
                                            .andWhere('compra.finalizada IS FALSE')
                                            .orderBy('compra.data', 'DESC')                                         
                                            .groupBy('compra.id')
                                            .getRawMany();
                                            
    }


    @Transaction()
    async createCarrinho(usuario_id, produto_id, @TransactionManager() manager: EntityManager, 
                                                @TransactionRepository(Usuario) usuarioRepository: Repository<Usuario>,
                                                @TransactionRepository(Produto) produtoRepository: Repository<Produto>){

    
       const usuario = await usuarioRepository.findOne(usuario_id);
    
       if(!usuario){
           throw new NotFoundException({mensagem : 'usuario_id inválido'});           
       }

      
        const produto = await produtoRepository.findOne(produto_id);

        if(!produto){
            throw new NotFoundException( {mensagem: `produto_id ${produto_id} inválido`});                
        }
       

        let compra_id;

        let compra = await this.compraRepository.findOne({usuario_id: usuario_id, finalizada: false});

        if(!compra){

            const data = (await manager.query(`select now()`))[0].now;

            const codigo = crypto.randomBytes(20).toString('HEX');   
             
            compra_id = await this.compraRepository.save({
                                                        data : data,
                                                        codigo : codigo,
                                                        finalizada: false,
                                                        usuario_id: usuario_id
                                                    });
        }
        else{
            compra_id = compra.id;
        }

    
        const compra_produto = {
            compra_id: compra_id,
            quantidade: 1,
            produto_id
        };

        await manager.save( new CompraProduto(compra_produto));
   
    return compra;
                                                    
    }

    @Transaction()
    async alterarProdutoCarrinho(usuario_id: number, produto_id : number, quantidade: number, @TransactionManager() manager: EntityManager,
                                    @TransactionRepository(CompraProduto) compraProdutoRepository: Repository<CompraProduto>){

        const compra = await this.compraRepository.findOne({usuario_id : usuario_id, finalizada: false});

        const compra_produto = await compraProdutoRepository.findOne({compra_id: compra.id, produto_id : produto_id});   
      
       
        if(!compra_produto){
           throw new NotFoundException({mensagem : 'produto_id inválido ou não existente no carrinho do usuário'});
        }
        
        compra_produto.quantidade = quantidade;

    
        await compraProdutoRepository.save(compra_produto);

        return 'Produto do carrinho alterado com sucesso.';
        
    }




}