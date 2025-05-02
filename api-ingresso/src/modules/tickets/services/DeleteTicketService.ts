import { getCustomRepository } from "typeorm";
import TicketRepository from "../typeorm/repositories/TicketRepository";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
    id: string;
}

export default class DeleteTicketService {
    public async execute ({id}: IRequest): Promise<void> {
        const ticketsRepository = getCustomRepository(TicketRepository)

        const ticket = await ticketsRepository.findOne(id);
        if(!ticket){
            throw new AppError("Ticket not found.")
        }

        await ticketsRepository.remove(ticket);

    }
}