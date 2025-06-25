import Film from "../../../films/typeorm/entities/Film";
import Client from "../../../clients/typeorm/entities/Client";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import Session from "../../../sessions/typeorm/entities/Session";



@Entity("tickets")
export default class Ticket {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("simple-array")
    seats: string[];

    @ManyToOne(() => Session, session => session.id)
    @JoinColumn({ name: "sessionId" })
    session: Session;

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