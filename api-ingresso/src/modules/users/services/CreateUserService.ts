import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute ({name, email, password}: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository)

        const userExists = await usersRepository.findByName(name);

        if(userExists)
            throw new AppError("There is already one user with this name.");

        const newUser = usersRepository.create({name, email, password});
        await usersRepository.save(newUser);
        return newUser;
    }
}