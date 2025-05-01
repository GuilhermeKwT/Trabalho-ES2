import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
    id: string;
}

export default class ShowUserService {
    public async execute ({id}: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository)

        const user = await usersRepository.findOne(id);
        if(!user){
            throw new AppError("User not found.")
        }

        return user;
    }
}