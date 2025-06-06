import { ErrorRequestHandler } from "express";
import { HttpError } from "../erros/HttpError";

export const erroHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) =>{
    if(error instanceof HttpError) {
        res.status(error.status).json({ message: error.message})
    } else if (error instanceof Error) {
        res.status(500).json({ message: error.message})
    } else {
        res.status(500).json({ message: "erro interno no servidor desconhecido"})
    }
}