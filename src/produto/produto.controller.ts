import { Controller, Get, Param, Post, Body, Patch, Query } from '@nestjs/common';
import { ApiTags , ApiParam, ApiProperty, ApiQuery} from '@nestjs/swagger';
import { ProdutoService } from './produto.service';


@Controller('produto')
@ApiTags('Produto')

export class ProdutoController {
    constructor(private readonly produtoService : ProdutoService ){

    }

    @Get('/')

    @ApiQuery({name: 'preco_minimo', required : false})
    @ApiQuery({name: 'preco_maximo', required : false})
    @ApiQuery({name : 'nome', required : false})
    async getProdutos(@Query('nome') nome, @Query('preco_minimo') preco_minimo, @Query('preco_maximo') preco_maximo){
        return await this.produtoService.getProdutos({nome : nome, preco_minimo : preco_minimo, preco_maximo : preco_maximo});
    }

    @Get('/:id')


    @ApiParam({name : 'id', required : true})
    async getProduto(@Param('id') id){
        return await this.produtoService.getProduto(id);
    }

}