import { NextFunction, Request, Response } from "express";
import ListFilmService from "../services/ListFilmService";
import ShowFilmService from "../services/ShowFilmService";
import CreateFilmService from "../services/CreateFilmService";
import UpdateFilmService from "../services/UpdateFilmService";
import DeleteFilmService from "../services/DeleteFilmService";

export default class FilmsController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const listFilms = new ListFilmService();
            const Films = await listFilms.execute();
            return response.json(Films);
        } catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;

            const showFilm = new ShowFilmService();
            const Film = await showFilm.execute({id});

            return response.json(Film);
        } catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {name, genres, directors, summary, banner} = request.body;

            const createFilm = new CreateFilmService();
            const Film = await createFilm.execute({name, genres, directors, summary, banner});

            return response.json(Film);
        } catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;
            const {name, genres, directors, summary, banner} = request.body;

            const updateFilm = new UpdateFilmService();
            const Film = await updateFilm.execute({id, name, genres, directors, summary, banner});

            return response.json(Film);
        } catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;

            const deleteFilm = new DeleteFilmService();
            await deleteFilm.execute({id});

            return response.json([]);
        } catch (err) {
            next(err);
        }
    }
}