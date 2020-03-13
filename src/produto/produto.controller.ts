import { Controller, Get, Param, Post, Body, Patch, Query } from '@nestjs/common';
import { ApiTags , ApiParam, ApiProperty, ApiQuery} from '@nestjs/swagger';
import { ProdutoService } from './produto.service';


@Controller('produto')
@ApiTags('Produto')

export class ProdutoController {
    constructor(private readonly produtoService : ProdutoService ){

    }

    @Get('/')
    async getProdutos(){
        return await this.produtoService.getProdutos();
    }

}