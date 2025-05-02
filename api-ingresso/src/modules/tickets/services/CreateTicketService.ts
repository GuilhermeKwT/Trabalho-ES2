import { getCustomRepository, Timestamp } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
    film: string;
    seats: number[];
    session_date: Date;
    user: string;
}

export default class CreateTicketService {
    public async execute ({film, seats, session_date, user}: IRequest): Promise<Ticket> {
        const ticketsRepository = getCustomRepository(TicketRepository)

        const ticketExists = await ticketsRepository.findByUserAndfilm(user, film);

        if(ticketExists)
            throw new AppError("There is already one ticket with this film for this user.");

        const newTicket = ticketsRepository.create({film, seats, session_date, user});
        await ticketsRepository.save(newTicket);
        return newTicket;
    }
}