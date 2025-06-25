import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import SessionsController from "../controllers/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController();
//sessionsRouter.use(isAuthenticated);

sessionsRouter.get("/", async (req, res, next) => {
    try {
        await sessionsController.index(req, res, next);
    } catch (err) {
        next(err);
    }
})

sessionsRouter.get("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), async (req, res, next) => {
    try {
        await sessionsController.show(req, res, next);
    } catch (err) {
        next(err);
    }
})

sessionsRouter.post("/", celebrate({
    [Segments.BODY]: {
        date: Joi.date().iso().required(),
        room: Joi.string().required(),
        filmId: Joi.string().uuid().required()
    }
}), async (req, res, next) => {
    try {
        await sessionsController.create(req, res, next);
    } catch (err) {
        next(err);
    }
})

sessionsRouter.put("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        date: Joi.date().iso().required(),
        room: Joi.string().required(),
        filmId: Joi.string().uuid().required()
    }
}), async (req, res, next) => {
    try {
        await sessionsController.update(req, res, next);
    } catch (err) {
        next(err);
    }
})

sessionsRouter.delete("/:id", async (req, res, next) => {
    try {
        await sessionsController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
})

export default sessionsRouter;