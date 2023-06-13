import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
//const bcrypt = require('bcrypt')
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
//const jwt = require('jsonwebtoken')
//require('dotenv').config()

const app = express();
dotenv.config();
app.use(express.json());
//console.log(process.env.MONGO_URL)

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
    console.log('conexão com o banco feita com sucesso');
})

routes(app);

export default app;