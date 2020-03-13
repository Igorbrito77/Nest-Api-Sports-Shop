import { Module } from '@nestjs/common';
import { PerfilController } from './perfil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfil } from '../entity/perfil.entity';

@Module({
    controllers: [PerfilController],
    imports: [TypeOrmModule.forFeature([Perfil])],
})
export class PerfilModule {}
