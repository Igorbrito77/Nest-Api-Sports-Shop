import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Compra } from './compra.entity';
import { Produto } from './produto.entity';

@Entity({ name: 'compra_produto', schema: 'public' })
export class CompraProduto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable : false})
    produto_id: number;

    @Column({nullable : false})
    compra_id: number;

    @Column({nullable : false})
    quantidade: number;

    constructor(partial: Partial<CompraProduto>) {
        Object.assign(this, partial);
    }

    @ManyToOne(type => Compra, compra => compra.id)
    @JoinColumn({ name: 'compra_id' })
    compra: Compra;

    @ManyToOne(type => Produto, produto => produto.id)
    @JoinColumn({ name: 'produto_id' })
    produto: Produto;


    /**
     *  produto_id integer NOT NULL,
  compra_id integer NOT NULL,
  quantidade integer NOT NULL,
     */
}
