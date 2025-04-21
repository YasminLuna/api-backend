const express = require ("express") //iniciando o express
const router = express.Router() // configurando primeira parte da rota
// const {v4: uuidv4} = require('uuid') //iniciando o pacote uuid
const cors = require('cors') // aqui estou trazendo o pacote cors que permite consumir essa api no front-end
const conectaBancoDeDados = require('./bancoDeDados') // Ligando ao arquivo banco de dados
conectaBancoDeDados() // chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')
const app = express() //iniciando o app
app.use(express.json()) //definindo que vamos fazer requisições em json
app.use(cors())
const porta = 3333 //definindo porta

// //lista inicial de mulheres
// const mulheres = [
//     {
//         id: '1',
//         nome: 'Yasmin Luna',
//         imagem: 'https://github.com/YasminLuna.png',
//         minibio: 'DevOps buscando mais conhecimento em desenvolvimento.'
//     },
//     {
//         id: '2',
//         nome: 'Simara Conceição',
//         imagem: 'https://bit.ly/3LJIyOF',
//         minibio: 'Desenvolvedora e instrutora',
//     },
//     {

//         id: '3',
//         nome: 'Iana Chan',
//         imagem: 'https://bit.ly/3JCXBqP',    
//         minibio: 'CEO & Founder da PrograMaria',
     
//     },
//     {

//         id: '4',
//         nome: 'Luana Pimentel',
//         imagem: 'https://bit.ly/3FKpFaz',
//         minibio: 'Senior Staff Software Engineer',
     
//     }
// ]
//GET
async function mostraMulheres(request, response) {
  try {
       const mulheresVindasDoBancoDeDados = await Mulher.find()
  
      response.json(mulheresVindasDoBancoDeDados)
  } catch (error) {
        console.log(erro)
    
  }
    
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
      // id: uuidv4(),
      nome: request.body.nome,
      imagem: request.body.imagem,
      minibio: request.body.minibio,
      citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
   
  //  mulheres.push(novaMulher)

    // response.json(mulheres)
   }

//PATCH
async function corrigeMulher(request, response) {
    // function encontraMulher(mulher){
    //   if (mulher.id === request.params.id){
    //     return mulher
    //   }
    // }
    try {
      const mulherEncontrada = await Mulher.findById(request.params.id)

    if (request.body.nome){
        mulherEncontrada.nome = request.body.nome
    }
    if (request.body.minibio){
        mulherEncontrada.minibio = request.body.minibio
    }
    if (request.body.imagem){
        mulherEncontrada.imagem = request.body.imagem
    }  
    if (request.body.citacao){
      mulherEncontrada = request.body.citacao
    }
    
    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

    response.json(mulherAtualizadaNoBancoDeDados)

    } catch (erro) {
        console.log(erro)
    }
  }

    // const mulherEncontrada = mulheres.find(encontraMulher)
    // if (request.body.nome){
    //     mulherEncontrada.nome = request.body.nome
    // }
    // if (request.body.minibio){
    //     mulherEncontrada.minibio = request.body.minibio
    // }
    // if (request.body.imagem){
    //     mulherEncontrada.imagem = request.body.imagem
    // }
  //   response.json(mulheres)
  // }  

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: 'Mulher deletada com sucesso!'})
    } catch (error) {
      console.log(erro)
    }
}
 //PORTA  
function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres)) //configurando rota GET/mulheres
app.use(router.post('/mulheres', criaMulher)) //configurando rota POST/mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurando rota PATCH/mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurando a rota DELETE/mulheres/:id
app.listen(porta, mostraPorta) //servidor ouvindo a porta