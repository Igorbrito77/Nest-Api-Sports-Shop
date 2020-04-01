import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from './categoria.entity';

@Entity({ name: 'subcategoria', schema: 'public' })
export class Subcategoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 80 })
    nome: string;

    @Column({nullable: true, length: 255 })
    descricao: string;

    @Column({nullable: false})
    categoria_id : number;

    @ManyToOne(type => Categoria, categoria => categoria.id)
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;

    constructor(partial: Partial<Subcategoria>) {
        Object.assign(this, partial);
    }
}
/**
 
 id integer NOT NULL DEFAULT nextval('subactegoria_id_seq'::regclass),
  categoria_id integer NOT NULL,
  nome character varying(80) NOT NULL,
  descricao character varying(255),
 * 
 */

