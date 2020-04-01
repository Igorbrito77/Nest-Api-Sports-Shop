import { Controller, Get, Param, Post, Body, Patch, Query } from '@nestjs/common';
import { ApiTags , ApiParam, ApiProperty, ApiQuery} from '@nestjs/swagger';
import { CategoriaService } from './categoria.service';


@Controller('categoria')
@ApiTags('Categoria')

export class CategoriaController {
    constructor(private readonly categoriaService : CategoriaService ){

    }

    @Get('/')
  //  @ApiQuery({name: 'preco_minimo', required : false})
    //@ApiQuery({name: 'preco_maximo', required : false})
    @ApiQuery({name : 'nome', required : false})
    async getCategorias(@Query('nome') nome){
        return await this.categoriaService.list();
    }

    // @Get('/:id')
    // @ApiParam({name : 'id', required : true})
    // async getProduto(@Param('id') id){
    //     return await this.produtoService.getProduto(id);
    // }

}