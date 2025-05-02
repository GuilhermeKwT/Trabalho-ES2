import { getCustomRepository } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";

interface IRequest {
    user: string;
}

export default class ListUserTicketService {
    public async execute ({user}: IRequest): Promise<Ticket[]> {
        const ticketsRepository = getCustomRepository(TicketRepository)
        console.log(user);
        const tickets = await ticketsRepository.findByUser(user);
        return tickets;
    }
}