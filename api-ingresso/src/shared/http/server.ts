import "reflect-metadata"
import https from 'https';
import fs from 'fs';
import path from 'path';
import express, { NextFunction, Request, Response } from "express"
import cors from "cors";
import routes from "./routes";
import AppError from "../errors/AppError"
import "@shared/typeorm"
import "express-async-errors"
import { errors } from "celebrate";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction): Response => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error);

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

/*
const httpsServer = https.createServer({
    key: fs.readFileSync(path.resolve(__dirname, '../certs/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../certs/cert.pem'))
}, app);
*/

// httpsServer.listen(3333, () => {
app.listen(3333, () => {
    console.log("Server started on port 3333");
})