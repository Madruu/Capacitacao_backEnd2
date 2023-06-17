import noticias from "../models/Noticia.js";

class NoticiaController {
    static listarNoticias = (req, res) => {
        const {categoria, titulo} = req.query;
        const filtros = {
            ...(categoria && {categoria:  categoria}),
            ...(titulo && {titulo:  titulo})
        };
        console.log(filtros);
        noticias.find(filtros)
            .populate('autor')
            .exec((err, noticias) => {
            res.status(200).json(noticias);
        })
    }

    static listabyId = (req,res) => {
        const id = req.params.id;
        noticias.findById(id)
            .populate('autor', 'nome') 
            .exec((err, noticias) => {
            if(err){
                res.status(400).send({message: `${err.message} - id do Noticia não encontrado`})
            } else {
                res.status(200).send(noticias);
            }
        })
    }

    static cadastrarNoticia = (req, res) => {
        let noticia = new noticias(req.body);
        noticia.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - Falha ao cadastrar o Noticia`})
            } else {
                res.status(201).send(noticia.toJSON())
            }
        })
    }

    static atualizaNoticia = (req, res) => {
        const id = req.params.id;

        noticias.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send('Noticia atualizado com sucesso');
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static deletaNoticia = (req, res) => {
        const id = req.params.id;

        noticias.findByIdAndDelete(id, (err)=> {
            if(!err){
                res.status(200).send({message: 'Noticia deletado com sucesso'});
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

}

export default NoticiaController;