import { Module } from "@nestjs/common";
import { CompraController } from "./compra.controller";
import { Compra } from "src/entity/compra.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompraService } from "./compra.service";

@Module({
    controllers : [CompraController],
    providers : [CompraService],
    imports: [TypeOrmModule.forFeature([Compra])],
})

export class CompraMoule{};