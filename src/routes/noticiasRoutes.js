import express from "express";
import NoticiaController from "../controllers/noticiasController.js";

//Roteamento do express
const router = express.Router();

router
    .get("/noticias", NoticiaController.listarNoticias)
    .get("/noticias/:id", NoticiaController.listabyId)
    .post("/noticias", NoticiaController.cadastrarNoticia)
    .put("/noticias/:id", NoticiaController.atualizaNoticia)
    .delete("/noticias/:id", NoticiaController.deletaNoticia)

export default router;