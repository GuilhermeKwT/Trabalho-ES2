import { NextFunction, Request, Response } from "express";
import ListTicketService from "../services/ListTicketService";
import ShowTicketService from "../services/ShowTicketService";
import CreateTicketService from "../services/CreateTicketService";
import UpdateTicketService from "../services/UpdateTicketService";
import DeleteTicketService from "../services/DeleteTicketService";
import ListUserTicketService from "../services/ListUserTicketService";

export default class TicketsController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const listTickets = new ListTicketService();
            const Tickets = await listTickets.execute();
            return response.json(Tickets);
        } catch (err) {
            next(err);
        }
    }

    public async listUserTickets(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {user} = request.params;
            console.log(user);
            const listTickets = new ListUserTicketService();
            const Tickets = await listTickets.execute({user});
            return response.json(Tickets);
        } catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;

            const showTicket = new ShowTicketService();
            const Ticket = await showTicket.execute({id});

            return response.json(Ticket);
        } catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {film, seats, session_date, user} = request.body;

            const createTicket = new CreateTicketService();
            const Ticket = await createTicket.execute({film, seats, session_date, user});

            return response.json(Ticket);
        } catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;
            const {film, seats, session_date, user} = request.body;

            const updateTicket = new UpdateTicketService();
            const Ticket = await updateTicket.execute({id, film, seats, session_date, user});

            return response.json(Ticket);
        } catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;

            const daleteTicket = new DeleteTicketService();
            await daleteTicket.execute({id});

            return response.json([]);
        } catch (err) {
            next(err);
        }
    }
}