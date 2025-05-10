import { getCustomRepository } from "typeorm";
import Client from "../typeorm/entities/Client";
import ClientRepository from "../typeorm/repositories/ClientRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class ShowClientService {
    public async execute ({id}: IRequest): Promise<Client> {
        const clientsRepository = getCustomRepository(ClientRepository)

        const client = await clientsRepository.findOne(id);
        if(!client){
            throw new AppError("Client not found.")
        }

        return client;
    }
}