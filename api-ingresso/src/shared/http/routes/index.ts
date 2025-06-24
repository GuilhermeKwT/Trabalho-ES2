import ticketsRouter from "@modules/tickets/routes/tickets.routes";
import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import { Router } from "express";
import clientsRouter from "@modules/clients/routes/client.routes";
import filmsRouter from "@modules/films/routes/film.routes";

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/tickets", ticketsRouter);
routes.use('/sessions', sessionsRouter);
routes.use("/clients", clientsRouter);
routes.use("/films", filmsRouter)

export default routes;