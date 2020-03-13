import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { Usuario } from 'src/entity/usuario.entity';
import { UsuarioService } from './usuario.service';

@Module({
    controllers: [UsuarioController],
    providers : [UsuarioService] ,
    imports: [TypeOrmModule.forFeature([Usuario])],
})
export class UsuarioModule {}
