import { Controller, Get, Header, Param, Headers } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { CompraService } from "./compra.service";

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

}