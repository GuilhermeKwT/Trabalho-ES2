import ticketsRouter from "@modules/tickets/routes/tickets.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();
routes.use("/users", usersRouter)
routes.use("/tickets", ticketsRouter)

export default routes;