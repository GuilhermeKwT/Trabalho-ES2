import { NextFunction, Request, Response } from "express";
import ListClientService from "../services/ListClientService";
import ShowClientService from "../services/ShowClientService";
import CreateClientService from "../services/CreateClientService";
import UpdateClientService from "../services/UpdateClientService";
import DeleteClientService from "../services/DeleteClientService";

export default class ClientsController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const listClients = new ListClientService();
            const Clients = await listClients.execute();
            return response.json(Clients);
        } catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;

            const showClient = new ShowClientService();
            const Client = await showClient.execute({id});

            return response.json(Client);
        } catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {name, email, password} = request.body;

            const createClient = new CreateClientService();
            const Client = await createClient.execute({name, email, password});

            return response.json(Client);
        } catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;
            const {name, email, password} = request.body;

            const updateClient = new UpdateClientService();
            const Client = await updateClient.execute({id, name, email, password});

            return response.json(Client);
        } catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;

            const daleteClient = new DeleteClientService();
            await daleteClient.execute({id});

            return response.json([]);
        } catch (err) {
            next(err);
        }
    }
}