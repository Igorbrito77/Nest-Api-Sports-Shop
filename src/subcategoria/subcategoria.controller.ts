import { Controller, Get, Param, Post, Body, Patch, Query } from '@nestjs/common';
import { ApiTags , ApiParam, ApiProperty, ApiQuery} from '@nestjs/swagger';
import { SubcategoriaService } from './subcategoria.service';
import { CadastroSubcategoriaDto } from './CadastroSubcategoria.dto';


@Controller('subcategoria')
@ApiTags('Subcategoria')

export class SubcategoriaController {
    constructor(private readonly subcategoriaService : SubcategoriaService ){

    }

    @Get('/')
    @ApiQuery({name : 'nome', required : false})
    async getCategorias(@Query('nome') nome){
        return await this.subcategoriaService.list();
    }

    @Post('/')
    async cadastrarSubcategoria(@Body() cadastroSubcategoriaDto : CadastroSubcategoriaDto){
      return await this.subcategoriaService.create.apply(this.subcategoriaService, [cadastroSubcategoriaDto]);
    }

    // @Get('/:id')
    // @ApiParam({name : 'id', required : true})
    // async getProduto(@Param('id') id){
    //     return await this.produtoService.getProduto(id);
    // }

}