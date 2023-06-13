import autores from "../models/autor.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class AutorController {
    static listarAutores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores);
        })
    }

    static listabyId = (req,res) => {
        const id = req.params.id;
        autores.findById(id, (err, autores) => {
            if(err){
                res.status(400).send({message: `${err.message} - id do autor não encontrado`})
            } else {
                res.status(200).send(autores);
            }
        });
    }

    static cadastrarAutor = async(req, res) => {
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(req.body.senha, salt)
        
        let autor = new autores({
             nome: req.body.nome,
             biografia: req.body.biografia,
             senha: passwordHash
        });

        autor.save(async (err) => {
            if(err){
                res.status(500).send({message: `${err.message} - Falha ao cadastrar o autor`})
            } else {
                res.status(201).send(autor.toJSON())
                
            }
        })
        const autorExists = await autores.findOne({nome: autor.nome})
        if(autorExists){
            return res.status(500).send({message: `O autor já existe.`})
        } 
        //const autorExists = await autor.findOne({nome: autor.nome})
        /*const autorExists = await autor.findOne({nome: nome})

        if(autorExists){
            res.status(500).send({message: `${err.message} - O autor já existe.`})
        }*/

    }

    static loginAutor = async(req,res) => {
        const autorExists = await autores.findOne({nome: req.body.nome})
        if(!autorExists){
            return res.status(500).send({message: `O autor não existe.`})
        } 

        const checaSenha = await bcrypt.compare(req.body.senha, autorExists.senha)
        if(!checaSenha){
            return res.status(422).send({message: 'Senha invalida.'})
        }
        
        try{
            const secret = process.env.JWT_SECRET
            //Cria o token
            const token = jwt.sign({
                id: autorExists._id,
            },secret)

            res.status(200).json({message: 'Autor autenticado!', token});

        } catch(err){

        }

    }

    static atualizaAutor = (req, res) => {

        const id = req.params.id;
        if(id !== req.payload.id){
            return res.status(401).send({message: "Não autorizado"})
        }
        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send('Autor atualizado com sucesso');
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static deletaAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndDelete(id, (err)=> {
            if(!err){
                res.status(200).send({message: 'Autor deletado com sucesso'});
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }
}

export default AutorController;