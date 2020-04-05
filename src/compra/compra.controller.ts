import { Controller, Get, Header, Param, Headers, Post, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader, ApiParam } from "@nestjs/swagger";
import { CompraService } from "./compra.service";
import { CadastroCompraDto } from "./CadastroCompra.dto";

@Controller('compra')
@ApiTags('Compra')

export class CompraController{

    constructor(private readonly compraService : CompraService){

    }

    @Get('/')
    @ApiHeader({
        name: 'usuario_id',
        description: 'Id do usuário logado',
        required: true
      })

    async listCompras(@Headers('usuario_id') usuario_id){
        console.log(usuario_id)
        return await this.compraService.listCompra(usuario_id);
    }

    @Post('/')
    @ApiHeader({
        name: 'usuario_id',
        description: 'Id do usuário logado',
        required: true
      })
      
    async cadastrarCompra(@Headers('usuario_id') usuario_id, @Body() cadastroCompraDto : CadastroCompraDto){
        return await this.compraService.createCompra.apply(this.compraService, [usuario_id, cadastroCompraDto]);
    }


    @Patch('/:id')
    @ApiParam({name: 'id', required: true})

    async finalizarCompra(@Param('id') id){
        return await this.compraService.finalizarCompra.apply(this.compraService, [id]);
    }


}