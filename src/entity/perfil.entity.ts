import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'perfil', schema: 'public' })
export class Perfil {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nome: string;

}
