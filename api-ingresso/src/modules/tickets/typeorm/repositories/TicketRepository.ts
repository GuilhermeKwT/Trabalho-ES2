import { EntityRepository, Repository } from "typeorm";
import Ticket from "../entities/Ticket";
import Client from "@modules/clients/typeorm/entities/Client";

@EntityRepository(Ticket)
export default class TicketRepository extends Repository<Ticket> {

    async findById(id: string): Promise<Ticket | undefined> {
        return this.findOne({ where: { id } });
    }

    async findByClientAndfilm(client: Client, film: string): Promise<Ticket | undefined>{
        return this.findOne({ where: { client, film }});
    }

    async findByClient(client: Client): Promise<Ticket[]> {
        return this.find({ where: { client } });
    }

}