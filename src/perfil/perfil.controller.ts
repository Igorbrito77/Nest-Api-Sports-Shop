import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags , ApiParam} from '@nestjs/swagger';
import { Repository } from 'typeorm';
import { Perfil } from 'src/entity/perfil.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('perfil')
@ApiTags('Perfil')
export class PerfilController {
  constructor( @InjectRepository(Perfil) 
               readonly perfilRepository: Repository<Perfil>
            ) {}

  @Get('/')
  async getPerfis() {
    return await this.perfilRepository.find();
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  async getUsuario(@Param('id') id) {
    return await this.perfilRepository.findOneOrFail(id);
  }

}
