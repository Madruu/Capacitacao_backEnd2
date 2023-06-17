import express from "express";
import NoticiaController from "../controllers/noticiasController.js";
import {checkToken}  from "../middlewares/checkToken.js";

//Roteamento do express
const router = express.Router();

router
    .get("/noticias", NoticiaController.listarNoticias)
    .get("/noticias/:id", NoticiaController.listabyId)
    .post("/noticias", NoticiaController.cadastrarNoticia)
    .put("/noticias/:id", checkToken, NoticiaController.atualizaNoticia)
    .delete("/noticias/:id", checkToken, NoticiaController.deletaNoticia)

export default router;