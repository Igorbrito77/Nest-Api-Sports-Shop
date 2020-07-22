import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from 'src/entity/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoginService {

  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository : Repository<Usuario>
  ) {}



  async create(loginBody) {

    const usuario = await this.usuarioRepository.findOne({ where : {email: loginBody.email, senha : loginBody.senha }});

    if(!usuario){
        throw new NotFoundException({mensagem : 'email/senha incorretos'});
    }

    return {usuario_id: usuario.id, usuario_nome: usuario.nome, mensagem:  'Login efetuado com sucesso.'}

  }

}