import { getCustomRepository } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class ShowTicketService {
    public async execute ({id}: IRequest): Promise<Ticket> {
        const ticketsRepository = getCustomRepository(TicketRepository)

        const ticket = await ticketsRepository.findOne(id);
        if(!ticket){
            throw new AppError("Ticket not found.")
        }

        return ticket;
    }
}