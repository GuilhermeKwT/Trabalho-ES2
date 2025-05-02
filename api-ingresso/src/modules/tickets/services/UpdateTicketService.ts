import { getCustomRepository, Timestamp } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
    id: string;
    film: string;
    seats: number[];
    session_date: Date;
    user: string;
}

export default class UpdateTicketService {
    public async execute ({id, film, seats, session_date, user}: IRequest): Promise<Ticket> {
        const ticketsRepository = getCustomRepository(TicketRepository)

        const ticket = await ticketsRepository.findOne(id);
        if(!ticket)
            throw new AppError("Ticket not found.")

        const ticketExits = await ticketsRepository.findByUserAndfilm(user, film);
        if(ticketExits && ticketExits.id !== id)
            throw new AppError("There is already one ticket with this film for this user.");

        ticket.film = film;
        ticket.seats = seats;
        ticket.session_date = session_date;
        ticket.user = user;
        await ticketsRepository.save(ticket);

        return ticket;
    }
}