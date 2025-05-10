import { getCustomRepository, Timestamp } from "typeorm";
import Client from "../typeorm/entities/Client";
import ClientRepository from "../typeorm/repositories/ClientRepository";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";

interface IRequest{
    name: string;
    email: string;
    password: string;
}

export default class CreateClientService {
    public async execute({name, email, password} : IRequest): Promise<Client>{
        const clientRepository = getCustomRepository(ClientRepository)
        const emailExists = await clientRepository.findByEmail(email);
        if(emailExists){
            throw new AppError('Email address alredy used.');
        }
        const hashedPassword = await hash(password, 8);
        const client = clientRepository.create({name, email, password: hashedPassword});
        await clientRepository.save(client);
        return client;
    }
}