import { Controller, Get, Param, Post, Body, Patch, Query } from '@nestjs/common';
import { ApiTags , ApiParam, ApiProperty, ApiQuery} from '@nestjs/swagger';
import { SubcategoriaService } from './subcategoria.service';


@Controller('subcategoria')
@ApiTags('Subcategoria')

export class SubcategoriaController {
    constructor(private readonly subcategoriaService : SubcategoriaService ){

    }

    @Get('/')
  //  @ApiQuery({name: 'preco_minimo', required : false})
    //@ApiQuery({name: 'preco_maximo', required : false})
    @ApiQuery({name : 'nome', required : false})
    async getCategorias(@Query('nome') nome){
        return await this.subcategoriaService.list();
    }

    // @Get('/:id')
    // @ApiParam({name : 'id', required : true})
    // async getProduto(@Param('id') id){
    //     return await this.produtoService.getProduto(id);
    // }

}