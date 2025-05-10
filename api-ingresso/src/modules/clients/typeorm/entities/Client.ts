import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";


@Entity("clients")
export default class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}