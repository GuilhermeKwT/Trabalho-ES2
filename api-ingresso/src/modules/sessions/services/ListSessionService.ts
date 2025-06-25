import { getCustomRepository } from "typeorm";
import Session from "../typeorm/entities/Session";
import SessionRepository from "../typeorm/repositories/SessionRepository";

export default class ListSessionService {
    public async execute (): Promise<Session[]> {
        const sessionsRepository = getCustomRepository(SessionRepository)

        const sessions = await sessionsRepository.find();
        return sessions;
    }
}