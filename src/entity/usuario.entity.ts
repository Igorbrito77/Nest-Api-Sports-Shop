import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Perfil } from './perfil.entity';
import { Endereco } from './endereco.entity';

@Entity({ name: 'usuario', schema: 'public' })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false,length: 50 })
    nome: string;

    @Column({length : 15})
    cpf : string

    @Column({nullable: false, length : 12})
    senha : string

    @Column({length : 30})
    email : string

    @Column({length : 16})
    telefone : string

    @Column({length : 16})
    celular : string

    @Column()
    created_at : Date

    @Column()
    updated_at : Date

    @Column()
    deleted_at : Date

    @Column()
    perfil_id : number

    @Column()
    endereco_id : number

    @ManyToOne(type => Endereco, endereco => endereco.id)
    @JoinColumn({ name: 'endereco_id' })
    endereco: Endereco;

    @ManyToOne(type => Perfil, perfil => perfil.id)
    @JoinColumn({ name: 'perfil_id' })
    perfil: Perfil;

    constructor(partial: Partial<Usuario>) {
        Object.assign(this, partial);
    }
}
