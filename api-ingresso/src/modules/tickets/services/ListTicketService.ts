import { getCustomRepository } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";

export default class ListTicketService {
    public async execute (): Promise<Ticket[]> {
        const ticketsRepository = getCustomRepository(TicketRepository)

        const tickets = await ticketsRepository.find();
        return tickets;
    }
}