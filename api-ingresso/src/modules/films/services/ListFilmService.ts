import { getCustomRepository } from "typeorm";
import Film from "../typeorm/entities/Film";
import FilmRepository from "../typeorm/repositories/FilmRepository";

export default class ListFilmService {
    public async execute (): Promise<Film[]> {
        const filmsRepository = getCustomRepository(FilmRepository)

        const films = await filmsRepository.find();
        return films;
    }
}