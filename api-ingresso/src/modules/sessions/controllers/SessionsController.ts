import { NextFunction, Request, Response } from "express";
import ListSessionService from "../services/ListSessionService";
import ShowSessionService from "../services/ShowSessionService";
import CreateSessionService from "../services/CreateSessionService";
import UpdateSessionService from "../services/UpdateSessionService";
import DeleteSessionService from "../services/DeleteSessionService";

export default class SessionsController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const listSessions = new ListSessionService();
            const Sessions = await listSessions.execute();
            return response.json(Sessions);
        } catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;

            const showSession = new ShowSessionService();
            const Session = await showSession.execute({id});

            return response.json(Session);
        } catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {date, room, filmId} = request.body;

            const createSession = new CreateSessionService();
            const Session = await createSession.execute({date, room, filmId});

            return response.json(Session);
        } catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;
            const {date, room, filmId} = request.body;

            const updateSession = new UpdateSessionService();
            const Session = await updateSession.execute({id, date, room, filmId});

            return response.json(Session);
        } catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;

            const deleteSession = new DeleteSessionService();
            await deleteSession.execute({id});

            return response.json([]);
        } catch (err) {
            next(err);
        }
    }
}