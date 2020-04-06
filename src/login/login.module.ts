import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entity/usuario.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    controllers: [LoginController],
    providers : [LoginService] ,
    imports: [TypeOrmModule.forFeature([Usuario])],
})
export class LoginModule {}
