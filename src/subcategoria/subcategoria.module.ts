import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubcategoriaController } from "./subcategoria.controller";
import { Subcategoria } from "src/entity/subcategoria.entity";
import { SubcategoriaService } from "./subcategoria.service";

@Module({
    controllers : [SubcategoriaController],
    providers : [SubcategoriaService],
    imports: [TypeOrmModule.forFeature([Subcategoria])],
})

export class SubcategoriaModule{};