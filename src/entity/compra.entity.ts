import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CompraProduto } from './compra_produto.entity';

@Entity({ name: 'compra', schema: 'public' })
export class Compra {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable : false, length: 100 })
    codigo: string;

    @Column({nullable : false})
    data: Date;

    @Column({nullable : false})
    usuario_id: number;

    @Column()
    finalizada: boolean;

    constructor(partial: Partial<Compra>) {
        Object.assign(this, partial);
    }

    @OneToMany(type=> CompraProduto, compra_produto => compra_produto.compra)
    compras_produto: CompraProduto[];

    /**
     * id integer NOT NULL DEFAULT nextval('compra_id_seq'::regclass),
  codigo character varying(100) NOT NULL,
  data timestamp without time zone NOT NULL,
  usuario_id integer NOT NULL,
  finalizada boolean NOT NULL DEFAULT false,
     * 
     */
}
