import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerfilModule } from './perfil/perfil.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoMoule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { SubcategoriaModule } from './subcategoria/subcategoria.module';
import { CompraMoule } from './compra/compra.module';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'bancoblz',
      database: 'sports_store',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //synchronize: true,
      logging: 'all',
    }),
    CategoriaModule,
    CompraMoule,
    PerfilModule,
    ProdutoMoule,
    SubcategoriaModule,
    UsuarioModule
  ],


  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
