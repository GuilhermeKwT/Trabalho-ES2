import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import User from "../../../users/typeorm/entities/User";


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
    userId: string;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: "userId" })
    user: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}