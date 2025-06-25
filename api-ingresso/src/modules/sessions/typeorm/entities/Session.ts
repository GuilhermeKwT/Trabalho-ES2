import Film from "../../../films/typeorm/entities/Film";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";


@Entity("sessions")
export default class Session {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: Date;

    @Column()
    room: string;

    @ManyToOne(() => Film, film => film.id)
    @JoinColumn({ name: "filmId" })
    film: Film;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}