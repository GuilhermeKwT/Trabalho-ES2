import { Router } from "express";
import ClientsController from "../controllers/ClientsController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.get("/", isAuthenticated, async (req, res, next) => {
    try {
        await clientsController.index(req, res, next);
    } catch (err) {
        next(err);
    }
})

clientsRouter.get("/:id", isAuthenticated, celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), async (req, res, next) => {
    try {
        await clientsController.show(req, res, next);
    } catch (err) {
        next(err);
    }
})

clientsRouter.post("/", isAuthenticated, celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }
}), async (req, res, next) => {
    try {
        await clientsController.create(req, res, next);
    } catch (err) {
        next(err);
    }
})

clientsRouter.put("/:id", isAuthenticated, celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }
}), async (req, res, next) => {
    try {
        await clientsController.update(req, res, next);
    } catch (err) {
        next(err);
    }
})

clientsRouter.delete("/:id", isAuthenticated, async (req, res, next) => {
    try {
        await clientsController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
})

export default clientsRouter;