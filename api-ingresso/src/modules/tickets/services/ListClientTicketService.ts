import { getCustomRepository } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";

interface IRequest {
    client: string;
}

export default class ListClientTicketService {
    public async execute ({client}: IRequest): Promise<Ticket[]> {
        const ticketsRepository = getCustomRepository(TicketRepository);
        const tickets = await ticketsRepository.findByClient(client);
        return tickets;
    }
}