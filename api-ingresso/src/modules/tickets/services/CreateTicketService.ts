import { getCustomRepository, Timestamp } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";
import AppError from "@shared/errors/AppError";
import ClientRepository from "@modules/clients/typeorm/repositories/ClientRepository";
import FilmRepository from "@modules/films/typeorm/repositories/FilmRepository";

interface IRequest {
    seats: number[];
    session_date: Date;
    filmId: string;
    clientId: string;
}

export default class CreateTicketService {
    public async execute ({seats, session_date, filmId, clientId}: IRequest): Promise<Ticket> {
        const ticketsRepository = getCustomRepository(TicketRepository)
        const clientRepository = getCustomRepository(ClientRepository);
        const client = await clientRepository.findById(clientId);
        if(!client)
            throw new AppError("Client not found.");

        const filmRepository = getCustomRepository(FilmRepository);
        const film = await filmRepository.findById(filmId);
        if(!film)
            throw new AppError("Film not found.");
        const ticketExists = await ticketsRepository.findByClientAndFilm(client, film);

        
        if(ticketExists)
            throw new AppError("There is already one ticket with this film for this client.");

        const newTicket = ticketsRepository.create({seats, session_date, film, client});
        await ticketsRepository.save(newTicket);
        return newTicket;
    }
}