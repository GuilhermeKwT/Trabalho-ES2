import { getCustomRepository } from "typeorm";
import Client from "../typeorm/entities/Client";
import ClientRepository from "../typeorm/repositories/ClientRepository";

export default class ListClientService {
    public async execute (): Promise<Client[]> {
        const clientsRepository = getCustomRepository(ClientRepository)

        const clients = await clientsRepository.find();
        return clients;
    }
}