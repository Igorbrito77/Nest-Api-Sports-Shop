import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Compra } from "src/entity/compra.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CompraService{

    constructor( @InjectRepository(Compra)  private readonly compraRepository : Repository<Compra>){

    }

    async listCompra(usuario_id){

        console.log(usuario_id);

        return await this.compraRepository.createQueryBuilder('compra')
        .select(`compra.id, compra.codigo, compra.data, compra.finalizada,
                array_agg(json_build_object('preco', produto.preco , 'quantidade', compra_produto.quantidade, 
                    'produto', produto.nome )) AS itens`)
                                            .innerJoin('compra.compras_produto', 'compra_produto')   
                                            .innerJoin('compra_produto.produto', 'produto')
                                            .where(`compra.usuario_id =  ${usuario_id}`)                                         
                                            .groupBy('compra.id')
                                            .getRawMany();
                                            
    }


}