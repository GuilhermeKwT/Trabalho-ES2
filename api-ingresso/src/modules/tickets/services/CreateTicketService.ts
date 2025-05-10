import { getCustomRepository, Timestamp } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";
import AppError from "@shared/errors/AppError";
import ClientRepository from "@modules/clients/typeorm/repositories/ClientRepository";

interface IRequest {
    film: string;
    seats: number[];
    session_date: Date;
    clientId: string;
}

export default class CreateTicketService {
    public async execute ({film, seats, session_date, clientId}: IRequest): Promise<Ticket> {
        const ticketsRepository = getCustomRepository(TicketRepository)
        const clientRepository = getCustomRepository(ClientRepository);
        const client = await clientRepository.findById(clientId);
        if(!client)
            throw new AppError("Client not found.");

        const ticketExists = await ticketsRepository.findByClientAndfilm(client, film);

        
        if(ticketExists)
            throw new AppError("There is already one ticket with this film for this client.");

        const newTicket = ticketsRepository.create({film, seats, session_date, client});
        await ticketsRepository.save(newTicket);
        return newTicket;
    }
}