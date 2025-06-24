import { getCustomRepository } from "typeorm";
import Film from "../typeorm/entities/Film";
import FilmRepository from "../typeorm/repositories/FilmRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class ShowFilmService {
    public async execute ({id}: IRequest): Promise<Film> {
        const filmsRepository = getCustomRepository(FilmRepository)

        const film = await filmsRepository.findOne(id);
        if(!film){
            throw new AppError("Film not found.")
        }

        return film;
    }
}