import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
    {
      nome: {type: String, required: true},
      biografia: {type: String, required: true},
      senha: {type: String, required: true},
    }
);

const autores = mongoose.model('autores', autorSchema);

export default autores;