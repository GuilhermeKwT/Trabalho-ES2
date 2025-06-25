import { getCustomRepository, Timestamp } from "typeorm";
import Session from "../typeorm/entities/Session";
import SessionRepository from "../typeorm/repositories/SessionRepository";
import AppError from "@shared/errors/AppError";
import FilmRepository from "@modules/films/typeorm/repositories/FilmRepository";

interface IRequest{
    date: Date;
    room: string;
    filmId: string;
}

export default class CreateSessionService {
    public async execute({date, room, filmId} : IRequest): Promise<Session>{
        const sessionRepository = getCustomRepository(SessionRepository)
        const filmRepository = getCustomRepository(FilmRepository);
        const film = await filmRepository.findById(filmId);
        if(!film)
            throw new AppError("Film not found.");
        const session = sessionRepository.create({date, room, film});
        await sessionRepository.save(session);
        return session;
    }
}