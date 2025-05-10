const express = require('express')

const app = express()

app.use(express.json()) // middleware que modela a requisição 

/* Base consolidada

{
    1: { // lembrete
        id: 1,
        texto: "ver um filme",
        observacoes: [
            {
                id: 1000,
                texto: "comprar pipoca".
                lembreteId: 1
            }
        ]
    },
    2: {
        id: 2,
        texto: "Ir à feira"
    }
}

*/

const baseConsolidada = {}

// Mapa de Funcoes, para evitar quebrar o principio Open Closed
const funcoes = {

    LembreteCriado: (lembrete) => {
        baseConsolidada[lembrete.id] = lembrete
    },
    ObservacaoCriada: (observacao) => {
        // Verifica se o array observacoes existe dentro do lembrete. Caso não exista, cria ela
        const observacoes = baseConsolidada[observacao.idLembrete]['observacoes'] || []
        observacoes.push(observacao)
        baseConsolidada[observacao.idLembrete]['observacoes'] = observacoes // ponteiro aponta para ele mesmo, caso seja a lista vazia
    }

}

app.get('/lembretes', (req, res) => {
    res.json(baseConsolidada)
})

app.post('/eventos', (req, res) => {

    const evento = req.body
    console.log(evento)
    funcoes[evento.tipo](evento.dados)
    res.end()

})


const port = 6000
app.listen(port, () => console.log(`Consulta. Porta ${port}`))