import { NextFunction, Request, Response } from "express";
import ListTicketService from "../services/ListTicketService";
import ShowTicketService from "../services/ShowTicketService";
import CreateTicketService from "../services/CreateTicketService";
import UpdateTicketService from "../services/UpdateTicketService";
import DeleteTicketService from "../services/DeleteTicketService";
import ListClientTicketService from "../services/ListClientTicketService";

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

    public async listClientTickets(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {clientId} = request.params;
            const listTickets = new ListClientTicketService();
            const Tickets = await listTickets.execute({clientId});
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
            const {seats, session_date, filmId, clientId} = request.body;

            const createTicket = new CreateTicketService();
            const Ticket = await createTicket.execute({seats, session_date, clientId, filmId});

            return response.json(Ticket);
        } catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;
            const {seats, session_date, filmId, clientId} = request.body;

            const updateTicket = new UpdateTicketService();
            const Ticket = await updateTicket.execute({id, seats, session_date, filmId, clientId});

            return response.json(Ticket);
        } catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {id} = request.params;

            const deleteTicket = new DeleteTicketService();
            await deleteTicket.execute({id});

            return response.json([]);
        } catch (err) {
            next(err);
        }
    }
}