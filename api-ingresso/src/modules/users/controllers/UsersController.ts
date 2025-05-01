import { NextFunction, Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import CreateUserService from "../services/CreateUserService";
import UpdateUserService from "../services/UpdateUserService";
import DeleteUserService from "../services/DeleteUserService";

export default class UsersController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const listUsers = new ListUserService();
            const Users = await listUsers.execute();
            return response.json(Users);
        } catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;

            const showUser = new ShowUserService();
            const User = await showUser.execute({id});

            return response.json(User);
        } catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {name, email, password} = request.body;

            const createUser = new CreateUserService();
            const User = await createUser.execute({name, email, password});

            return response.json(User);
        } catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;
            const {name, email, password} = request.body;

            const updateUser = new UpdateUserService();
            const User = await updateUser.execute({id, name, email, password});

            return response.json(User);
        } catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;

            const daleteUser = new DeleteUserService();
            await daleteUser.execute({id});

            return response.json([]);
        } catch (err) {
            next(err);
        }
    }
}