import { getCustomRepository, Timestamp } from "typeorm";
import Film from "../typeorm/entities/Film";
import FilmRepository from "../typeorm/repositories/FilmRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    name: string;
    genres: string[];
    directors: string[];
    summary: string;
    banner: string;
}

export default class CreateFilmService {
    public async execute({name, genres, directors, summary, banner} : IRequest): Promise<Film>{
        const filmRepository = getCustomRepository(FilmRepository)
        const emailExists = await filmRepository.findByName(name);
        if(emailExists){
            throw new AppError('Theres alredy one film with this name.');
        }
        const film = filmRepository.create({name, genres, directors, summary, banner});
        await filmRepository.save(film);
        return film;
    }
}