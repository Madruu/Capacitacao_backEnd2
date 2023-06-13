import express from "express";
import autores from "./AutoresRoutes.js";
import noticias from "./noticiasRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Blog de autores"});
    })
    
    app.use(
        express.json(),
        autores,
        noticias
    )
}

export default routes;