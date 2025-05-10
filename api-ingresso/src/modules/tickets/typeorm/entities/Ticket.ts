import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import Client from "@modules/clients/typeorm/entities/Client";


@Entity("tickets")
export default class Ticket {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    film: string;

    @Column("simple-array")
    seats: number[];

    @Column()
    session_date: Date;

    @Column()
    clientId: string;

    @ManyToOne(() => Client, client => client.id)
    @JoinColumn({ name: "clientId" })
    client: Client;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}