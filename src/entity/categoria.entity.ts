import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Subcategoria } from './subcategoria.entity';

@Entity({ name: 'categoria', schema: 'public' })
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 80 })
    nome: string;

    @Column({nullable: true, length: 255 })
    descricao: string;

    @OneToMany(type => Subcategoria, subcategoria => subcategoria.categoria)
    //@JoinColumn({ name: 'id' })
    subcategorias: Subcategoria[];


    constructor(partial: Partial<Categoria>) {
        Object.assign(this, partial);
    }
}

