import { EntityRepository, Repository } from "typeorm";
import Ticket from "../entities/Ticket";

@EntityRepository(Ticket)
export default class TicketRepository extends Repository<Ticket> {

    async findById(id: string): Promise<Ticket | undefined> {
        return this.findOne({ where: { id } });
    }

    async findByUserAndfilm(user: string, film: string): Promise<Ticket | undefined>{
        return this.findOne({ where: { user, film }});
    }

    async findByUser(user: string): Promise<Ticket[]> {
        return this.find({ where: { userId: user } });
    }

}