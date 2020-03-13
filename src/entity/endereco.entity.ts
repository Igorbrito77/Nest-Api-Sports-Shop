import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'endereco', schema: 'public' })
export class Endereco {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    logradouro: string;

    @Column({ length: 45 })
    numero: string;

    @Column({ length: 50 })
    bairro: string;

    @Column({ length: 25 })
    cidade: string;

    @Column({ length: 20 })
    estado: string;

    @Column()
    ponto_referencia: string;

    @Column({ length: 10 })
    cep: string;

    constructor(partial: Partial<Endereco>) {
        Object.assign(this, partial);
    }
}
