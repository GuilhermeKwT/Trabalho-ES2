import Film from "../../../films/typeorm/entities/Film";
import Client from "../../../clients/typeorm/entities/Client";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";


@Entity("tickets")
export default class Ticket {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("simple-array")
    seats: number[];

    @Column()
    session_date: Date;

    @ManyToOne(() => Film, film => film.id)
    @JoinColumn({ name: "filmId" })
    film: Film;

    @ManyToOne(() => Client, client => client.id)
    @JoinColumn({ name: "clientId" })
    client: Client;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}