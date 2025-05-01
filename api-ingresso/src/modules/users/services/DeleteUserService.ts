import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
    id: string;
}

export default class DeleteUserService {
    public async execute ({id}: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UserRepository)

        const user = await usersRepository.findOne(id);
        if(!user){
            throw new AppError("User not found.")
        }

        await usersRepository.remove(user);

    }
}