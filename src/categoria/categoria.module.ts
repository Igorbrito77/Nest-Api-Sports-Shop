import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaController } from "./categoria.controller";
import { Categoria } from "src/entity/categoria.entity";
import { CategoriaService } from "./categoria.service";

@Module({
    controllers : [CategoriaController],
    providers : [CategoriaService],
    imports: [TypeOrmModule.forFeature([Categoria])],
})

export class CategoriaModule{};