import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, TransactionRepository, createQueryBuilder, TransactionManager, EntityManager, Transaction } from 'typeorm';
import { Usuario } from 'src/entity/usuario.entity';
import { Endereco } from 'src/entity/endereco.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from 'src/entity/perfil.entity';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository : Repository<Usuario>
  ) {}

  retorna_filtragem(filtro){

      let where = [];
      let parametros = {};


      if(filtro.nome){
        where.push(`usuario.nome ilike :nome `);
        parametros['nome'] = `%${filtro.nome}%`;
      }
      
      if(filtro.cpf){
        where.push('usuario.cpf = :cpf');
        parametros['cpf'] = filtro.cpf;
      }

      return {filtro_completo : where.join(" AND "), parametros : parametros };

  }


  async getUsuarios(filtros : Object) {

 
    const {filtro_completo, parametros} = this.retorna_filtragem(filtros);
    
    const query =   this.usuarioRepository.createQueryBuilder('usuario')
                                              .innerJoinAndSelect('usuario.perfil', 'perfil')
                                              .innerJoinAndSelect('usuario.endereco', 'endereco')
                                              .select(` usuario.id, usuario.nome, perfil.nome AS perfil, usuario.cpf,                                               
                                                        endereco.cidade, endereco.estado`)                                                       
                                              .orderBy('usuario.id', 'DESC')
                                              .where(filtro_completo , parametros);
                                              
    const dados = await query.getRawMany();
    const total = await query.getCount();
  
    return {total, dados};

  }

  async getUsuario(id: number){
    console.log(id);
    return await this.usuarioRepository.findOne(id);
  }

    
  async getCompraUsuario(id : number){

    

  }




  @Transaction()
  async create(usuarioBody,
          @TransactionManager() manager: EntityManager,
          @TransactionRepository(Perfil) perfilRepository : Repository<Perfil>
  ) {

      const perfil = await perfilRepository.findOne(usuarioBody.perfil_id);

      if(!perfil){
        throw new NotFoundException({ mensagem: 'perfil_id inválido' });
      }


      const enderecoBody = usuarioBody.endereco;
  
      usuarioBody.created_at = (await manager.query(`select now()`))[0].now;

      const endereco = await manager.save(new Endereco(enderecoBody));
   
      usuarioBody.endereco_id = endereco.id;

      const usuario = await manager.save( new Usuario(usuarioBody));

     
      return usuario;
     //   return `Usuário ${usuarioBody.nome} cadastrado com sucesso`;
  }

  @Transaction()
  async desativa(  @TransactionManager() manager: EntityManager,
                id : number,
                flag : boolean,
              
  ){

  
    const usuario = await this.usuarioRepository.findOne({where : {id : id, deleted_at : null }});

    if(!usuario){
       throw new NotFoundException({mensagem : 'id inválido'});
    }

    usuario.deleted_at = flag ? null :  (await manager.query(`select now()`))[0].now;;

    await this.usuarioRepository.save(usuario);

    return flag ? 'usuário ativado com sucesso' : 'usuário desativado com sucesso';

  }

}

 