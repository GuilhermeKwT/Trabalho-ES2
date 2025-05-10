import { NextFunction, Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";

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
}