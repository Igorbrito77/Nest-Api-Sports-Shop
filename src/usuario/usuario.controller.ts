import { Controller, Get, Param, Post, Body, Patch, Query } from '@nestjs/common';
import { ApiTags , ApiParam, ApiProperty, ApiQuery} from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { CadastroUsuarioDto } from './CadastroUsuario.dto';

@Controller('usuario')
@ApiTags('Usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/')
  @ApiQuery({ name: 'nome', required: false })
  @ApiQuery({ name: 'cpf', required: false})
  async getUsuarios(@Query('nome')  nome : string, @Query('cpf') cpf) {
    return await this.usuarioService.getUsuarios(nome, cpf);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  getUsuario(@Param('id') id) {
    return this.usuarioService.getUsuario(id);
  }

  @Post('/')
  async cadastraUsuario(@Body() cadastroUsuarioDto : CadastroUsuarioDto){
        const mensagem = await this.usuarioService.create.apply(this.usuarioService, [cadastroUsuarioDto]);
        return mensagem;
  }

  @Patch('/:id')
  @ApiParam({ name: 'id', required: true })
  @ApiParam({ name: 'flag', required: true})
  async desativaUsuario(@Param('id') id, @Param('flag')flag : boolean){
      return await this.usuarioService.desativa.apply(this.usuarioService, [id, flag]);
  }

}
