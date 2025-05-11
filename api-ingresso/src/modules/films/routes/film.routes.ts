import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import FilmsController from "../controllers/FilmsController";

const filmsRouter = Router();
const filmsController = new FilmsController();

filmsRouter.get("/", isAuthenticated, async (req, res, next) => {
    try {
        await filmsController.index(req, res, next);
    } catch (err) {
        next(err);
    }
})

filmsRouter.get("/:id", isAuthenticated, celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), async (req, res, next) => {
    try {
        await filmsController.show(req, res, next);
    } catch (err) {
        next(err);
    }
})

filmsRouter.post("/", isAuthenticated, celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        genres: Joi.array().items(Joi.string()).required(),
        directors: Joi.array().items(Joi.string()).required(),
        summary: Joi.string().required(),
        banner: Joi.string(),
        release_date: Joi.date().iso()
    }
}), async (req, res, next) => {
    try {
        await filmsController.create(req, res, next);
    } catch (err) {
        next(err);
    }
})

filmsRouter.put("/:id", isAuthenticated, celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        name: Joi.string().required(),
        genres: Joi.array().items(Joi.string()).required(),
        directors: Joi.array().items(Joi.string()).required(),
        summary: Joi.string().required(),
        banner: Joi.string(),
        release_date: Joi.date().iso()
    }
}), async (req, res, next) => {
    try {
        await filmsController.update(req, res, next);
    } catch (err) {
        next(err);
    }
})

filmsRouter.delete("/:id", isAuthenticated, async (req, res, next) => {
    try {
        await filmsController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
})

export default filmsRouter;