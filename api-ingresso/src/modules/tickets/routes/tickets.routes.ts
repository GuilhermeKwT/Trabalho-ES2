import { Router } from "express";
import TicketsController from "../controllers/TicketsController";
import { celebrate, Joi, Segments } from "celebrate";

const ticketsRouter = Router();
const ticketsController = new TicketsController();

ticketsRouter.get("/", async (req, res, next) => {
    try {
        await ticketsController.index(req, res, next);
    } catch (err) {
        next(err);
    }
})

ticketsRouter.get("/user/:user", celebrate({
    [Segments.PARAMS]: { user: Joi.string().uuid().required() }
}), async (req, res, next) => {
    try {
        await ticketsController.listUserTickets(req, res, next);
    } catch (err) {
        next(err);
    }
})

ticketsRouter.get("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), async (req, res, next) => {
    try {
        await ticketsController.show(req, res, next);
    } catch (err) {
        next(err);
    }
})

ticketsRouter.post("/", celebrate({
    [Segments.BODY]: {
        film: Joi.string().required(),
        seats: Joi.array().items(Joi.number().integer()).required(),
        session_date: Joi.date().required(),
        user: Joi.string().uuid().required(),
    }
}), async (req, res, next) => {
    try {
        await ticketsController.create(req, res, next);
    } catch (err) {
        next(err);
    }
})

ticketsRouter.put("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        film: Joi.string().required(),
        seats: Joi.array().items(Joi.number().integer()).required(),
        session_date: Joi.date().required(),
        user: Joi.string().uuid().required(),
    }
}), async (req, res, next) => {
    try {
        await ticketsController.update(req, res, next);
    } catch (err) {
        next(err);
    }
})

ticketsRouter.delete("/:id", async (req, res, next) => {
    try {
        await ticketsController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
})

export default ticketsRouter;