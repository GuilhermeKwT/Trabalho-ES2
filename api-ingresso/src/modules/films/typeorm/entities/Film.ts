import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";


@Entity("films")
export default class Film {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column("simple-array")
    genres: string[];

    @Column("simple-array")
    directors: string[];

    @Column()
    summary: string;
        
    @Column()
    banner: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}