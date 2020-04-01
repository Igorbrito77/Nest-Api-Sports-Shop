import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompraService } from "./compra.service";

@Controller('compra')
@ApiTags('Compra')

export class CompraController{

    constructor(private readonly compraService : CompraService){

    }

    @Get('/')
    async listCompras(){
        return await this.compraService.listCompra();
    }

}