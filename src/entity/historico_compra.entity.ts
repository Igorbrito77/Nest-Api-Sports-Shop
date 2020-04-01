import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { type } from "os";
import { Usuario } from "./usuario.entity";
import { Compra } from "./compra.entity";

@Entity({name: 'historico_compra', schema: 'public'})
export class HistoricoCompra{

    @PrimaryGeneratedColumn()
    id : number

    @Column({nullable: false})
    usuario_id : number

    @Column({nullable: false})
    compra_id : number

 
    @ManyToOne(type=> Usuario, usuario => usuario.id)
    @JoinColumn({name : 'usuario_id'})
    usuario : Usuario

    @ManyToOne(type=> Compra, compra => compra.id)
    @JoinColumn({name : 'compra_id'})
    compra : Compra

}