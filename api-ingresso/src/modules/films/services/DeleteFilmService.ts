import { getCustomRepository } from "typeorm";
import FilmRepository from "../typeorm/repositories/FilmRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class DeleteFilmService {
    public async execute ({id}: IRequest): Promise<void> {
        const filmsRepository = getCustomRepository(FilmRepository)

        const film = await filmsRepository.findOne(id);
        if(!film){
            throw new AppError("Film not found.")
        }

        await filmsRepository.remove(film);

    }
}