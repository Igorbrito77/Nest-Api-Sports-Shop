import { Module } from "@nestjs/common";
import { CarrinhoController } from "./carrinho.controller";
import { Compra } from "src/entity/compra.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarrinhoService } from "./carrinho.service";

@Module({
    controllers : [CarrinhoController],
    providers : [CarrinhoService],
    imports: [TypeOrmModule.forFeature([Compra])],
})

export class CarrinhoModule{};