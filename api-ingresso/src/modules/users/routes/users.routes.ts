import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get("/", async (req, res, next) => {
    try {
        await usersController.index(req, res, next);
    } catch (err) {
        next(err)
    }
})

usersRouter.get("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), async (req, res, next) => {
    try {
        await usersController.show(req, res, next);
    } catch (err) {
        next(err)
    }
})

usersRouter.post("/", celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }
}), async (req, res, next) => {
    try {
        await usersController.create(req, res, next);
    } catch (err) {
        next(err)
    }
})

usersRouter.put("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }
}), async (req, res, next) => {
    try {
        await usersController.update(req, res, next);
    } catch (err) {
        next(err)
    }
})

usersRouter.delete("/:id", async (req, res, next) => {
    try {
        await usersController.delete(req, res, next);
    } catch (err) {
        next(err)
    }
})

export default usersRouter;