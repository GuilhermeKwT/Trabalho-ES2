import { getCustomRepository } from "typeorm";
import SessionRepository from "../typeorm/repositories/SessionRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class DeleteSessionService {
    public async execute ({id}: IRequest): Promise<void> {
        const sessionsRepository = getCustomRepository(SessionRepository)

        const session = await sessionsRepository.findOne(id);
        if(!session){
            throw new AppError("Session not found.")
        }

        await sessionsRepository.remove(session);

    }
}