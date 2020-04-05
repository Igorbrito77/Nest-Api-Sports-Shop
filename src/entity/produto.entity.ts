import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CompraProduto } from './compra_produto.entity';
import { Subcategoria } from './subcategoria.entity';

@Entity({ name: 'produto', schema: 'public' })
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false,length: 50 })
    nome: string;

    @Column()
    preco : number

    @Column()
    subcategoria_id : number

    @Column()
    usuario_id : number

    @Column()
    created_at : Date

    @Column()
    updated_at : Date

    @Column()
    deleted_at : Date

    @ManyToOne(type => Usuario, usuario => usuario.id)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(type => Subcategoria, subcategoria => subcategoria.id)
    @JoinColumn({ name: 'subcategoria_id' })
    subcategoria: Subcategoria;

   //  @ManyToOne(type => CompraProduto, compra_produto => compra_produto.produto)
   //  compra_produto: CompraProduto;

    /**
     * 
     *  id integer NOT NULL DEFAULT nextval('produto_id_seq'::regclass),
        nome character varying(100) NOT NULL,
        preco character varying(20) NOT NULL,
        subcategoria_id integer NOT NULL,
        usuario_id integer NOT NULL,
        created_at timestamp without time zone NOT NULL,
        updated_at timestamp without time zone,
        deleted_at timestamp without time zone,
     */

}
