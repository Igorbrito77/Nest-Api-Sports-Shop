import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Compra } from "src/entity/compra.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CompraService{

    constructor( @InjectRepository(Compra)  private readonly compraRepository : Repository<Compra>){

    }

    async listCompra(){
        return await this.compraRepository.createQueryBuilder('compra')
        .select(`compra.id, compra.codigo, compra.data, compra.usuario_id, compra.finalizada,
                array_agg(json_build_object('id', compra_produto.id, 'quantidade', compra_produto.quantidade, 
                    'produto', produto.nome )) `)
                                            .leftJoin('compra.compras_produto', 'compra_produto')   
                                            .leftJoin('compra_produto.produto', 'produto')                                         
                                            .groupBy('compra.id')
                                            .getRawMany();
                                            
    }


}