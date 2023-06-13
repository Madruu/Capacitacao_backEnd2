import mongoose from "mongoose";

const noticiaSchema = new mongoose.Schema(
    {
       autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true},
       titulo: {type: String, required: true},
       categoria: {type: String, required: true},
       conteudo: {type: String, required: true},
       //dataCriacao: {type: Date()} 
    },
    {
        versionKey: false
    }
)

const noticias = mongoose.model("noticias", noticiaSchema)

export default noticias;