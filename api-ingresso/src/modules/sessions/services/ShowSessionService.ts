import { getCustomRepository } from "typeorm";
import Session from "../typeorm/entities/Session";
import SessionRepository from "../typeorm/repositories/SessionRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class ShowSessionService {
    public async execute ({id}: IRequest): Promise<Session> {
        const sessionsRepository = getCustomRepository(SessionRepository)

        const session = await sessionsRepository.findOne(id);
        if(!session){
            throw new AppError("Session not found.")
        }

        return session;
    }
}