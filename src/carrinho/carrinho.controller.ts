import { Controller, Get, Header, Param, Headers, Post, Body, Patch,Delete, Query } from "@nestjs/common";
import { ApiTags, ApiHeader, ApiParam, ApiQuery } from "@nestjs/swagger";
import { CarrinhoService } from "./carrinho.service";

@Controller('carrinho')
@ApiTags('Carrinho')

export class CarrinhoController{

    constructor(private readonly carrinhoService : CarrinhoService){

    }

    @Get('/')
    @ApiHeader({
        name: 'usuario_id',
        description: 'Id do usuário logado',
        required: true
      })

    async listCompras(@Headers('usuario_id') usuario_id){

        return await this.carrinhoService.getCarrinho.apply(this.carrinhoService, [usuario_id])
    }

    @Post('/')
    @ApiHeader({
        name: 'usuario_id',
        description: 'Id do usuário logado',
        required: true
      })

    @ApiQuery({name: 'produto_id', required: true})

    async cadastrarCarrinho(@Headers('usuario_id') usuario_id, @Query('produto_id') produto_id ){
        return await this.carrinhoService.createCarrinho.apply(this.carrinhoService, [usuario_id, produto_id]);
    }


    @Patch('/produto/:id')
    @ApiHeader({
        name: 'usuario_id',
        description: 'Id do usuário logado',
        required: true
      })
    @ApiParam({name: 'id', required: true})
    @ApiQuery({name: 'quantidade', required: true})

    async alterarProdutoCarinho(@Param('id') id, @Headers('usuario_id') usuario_id, @Query('quantidade') quantidade){
        return await this.carrinhoService.alterarProdutoCarrinho.apply(this.carrinhoService, [usuario_id, id, quantidade]);
    }

    @Delete('/produto/:id')
    @ApiHeader({
        name: 'usuario_id',
        description: 'Id do usuário logado',
        required: true
      })
    @ApiParam({name: 'id', required: true})
    
    async removerProdutoCarinho(@Param('id') id, @Headers('usuario_id') usuario_id){
        return await this.carrinhoService.removerProdutoCarrinho.apply(this.carrinhoService, [usuario_id, id]);
    }

    @Get('/total-produtos')
    @ApiHeader({
        name: 'usuario_id',
        description: 'Id do usuário logado',
        required: true
      })

    async retornarTotalProdutos(@Headers('usuario_id') usuario_id){

        return await this.carrinhoService.retornarTotalProdutos.apply(this.carrinhoService, [usuario_id])
    }


}