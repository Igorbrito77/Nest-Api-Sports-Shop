import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { Produto } from "src/entity/produto.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoService } from "./produto.service";

@Module({
    controllers : [ProdutoController],
    providers : [ProdutoService],
    imports: [TypeOrmModule.forFeature([Produto])],
})

export class ProdutoMoule{};