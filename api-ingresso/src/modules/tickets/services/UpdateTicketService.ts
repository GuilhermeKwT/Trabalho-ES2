import { getCustomRepository, Timestamp } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";
import AppError from "@shared/errors/AppError";
import ClientRepository from "@modules/clients/typeorm/repositories/ClientRepository";
import FilmRepository from "@modules/films/typeorm/repositories/FilmRepository";

interface IRequest {
    id: string;
    seats: number[];
    session_date: Date;
    filmId: string;
    clientId: string;
}

export default class UpdateTicketService {
    public async execute ({id, seats, session_date, filmId, clientId}: IRequest): Promise<Ticket> {
        const ticketsRepository = getCustomRepository(TicketRepository)
        const clientRepository = getCustomRepository(ClientRepository);
        const ticket = await ticketsRepository.findOne(id);
        const client = await clientRepository.findById(clientId);

        if(!ticket)
            throw new AppError("Ticket not found.")

        if(!client)
            throw new AppError("Client not found.");

        const filmRepository = getCustomRepository(FilmRepository);
        const film = await filmRepository.findById(filmId);
        if(!film)
            throw new AppError("Film not found.");

        const ticketExits = await ticketsRepository.findByClientAndFilm(client, film);
        if(ticketExits && ticketExits.id !== id)
            throw new AppError("There is already one ticket with this film for this client.");

        ticket.film = film;
        ticket.seats = seats;
        ticket.session_date = session_date;
        ticket.client = client;
        await ticketsRepository.save(ticket);

        return ticket;
    }
}