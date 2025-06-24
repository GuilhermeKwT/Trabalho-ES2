import { getCustomRepository } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";
import ClientRepository from "@modules/clients/typeorm/repositories/ClientRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    clientId: string;
}

export default class ListClientTicketService {
    public async execute ({clientId}: IRequest): Promise<Ticket[]> {
        const ticketsRepository = getCustomRepository(TicketRepository);
        const clientRepository = getCustomRepository(ClientRepository);
        const client = await clientRepository.findById(clientId);
        if (!client) {
            throw new AppError("Client not found.");
        }
        const tickets = await ticketsRepository.findByClient(client);
        return tickets;
    }
}