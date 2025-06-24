import { getCustomRepository, Timestamp } from "typeorm";
import Film from "../typeorm/entities/Film";
import FilmRepository from "../typeorm/repositories/FilmRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
    name: string;
    genres: string[];
    directors: string[];
    summary: string;
    banner: string;
}

export default class UpdateFilmService {
    public async execute ({id, name, genres, directors, summary, banner}: IRequest): Promise<Film> {
        const filmsRepository = getCustomRepository(FilmRepository)

        const film = await filmsRepository.findOne(id);
        if(!film)
            throw new AppError("Film not found.")

        const filmExits = await filmsRepository.findByName(name);
        if(filmExits && id !== film.id)
            throw new AppError("There is already one film with this name.");

        film.name = name;
        film.genres = genres;
        film.directors = directors;
        film.summary = summary;
        film.banner = banner;
        
        await filmsRepository.save(film);

        return film;
    }
}