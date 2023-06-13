import express from "express";
import autoresController from "../controllers/autoresController.js";
import {checkToken}  from "../middlewares/checkToken.js";

//Roteamento do express
const router = express.Router();

router
    .get("/autores", checkToken, autoresController.listarAutores)
    .get("/autores/:id", autoresController.listabyId)
    .post("/autores", autoresController.cadastrarAutor)
    .post("/autores/login", autoresController.loginAutor)
    .put("/autores/:id", checkToken, autoresController.atualizaAutor)
    .delete("/autores/:id", checkToken, autoresController.deletaAutor)

export default router;
