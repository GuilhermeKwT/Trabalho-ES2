import { EntityRepository, Repository } from "typeorm";
import Ticket from "../entities/Ticket";
import Client from "@modules/clients/typeorm/entities/Client";
import Film from "@modules/films/typeorm/entities/Film";

@EntityRepository(Ticket)
export default class TicketRepository extends Repository<Ticket> {

    async findById(id: string): Promise<Ticket | undefined> {
        const film = await this.findOne({ where: { id }, relations: ["film", "client", "session"] });
        return film;
    }

    async findByClientAndFilm(client: Client, film: Film): Promise<Ticket | undefined>{
        return this.findOne({ where: { client, film }});
    }

    async findByClient(client: Client): Promise<Ticket[]> {
        return this.find({ where: { client }, relations: ["film"] });
    }

}