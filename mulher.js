const express = require ("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response){
    response.json({
        nome: 'Yasmin Luna',
        imagem: 'https://github.com/YasminLuna.png',
        minibio: 'DevOps buscando mais conhecimento em desenvolvimento.'
    })
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)