import { getCustomRepository, Timestamp } from "typeorm";
import Session from "../typeorm/entities/Session";
import SessionRepository from "../typeorm/repositories/SessionRepository";
import AppError from "@shared/errors/AppError";
import FilmRepository from "@modules/films/typeorm/repositories/FilmRepository";

interface IRequest{
    id: string;
    date: Date;
    room: string;
    filmId: string;
}

export default class UpdateSessionService {
    public async execute ({id, date, room, filmId}: IRequest): Promise<Session> {
        const sessionsRepository = getCustomRepository(SessionRepository)

        const session = await sessionsRepository.findOne(id);
        if(!session)
            throw new AppError("Session not found.");

        const filmsRepository = getCustomRepository(FilmRepository);
        const film = await filmsRepository.findById(filmId);
        if(!film)
            throw new AppError("Film not found.");
        

        session.date = date;
        session.room = room;
        session.film = film;
        
        await sessionsRepository.save(session);

        return session;
    }
}