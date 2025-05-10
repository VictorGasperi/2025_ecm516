const express = require('express')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')

const app = express()
app.use(express.json())

/*

    1: [
        {
    
            id: 1001,
            idLembrete: 1,
            texto: Sem açucar
    
        },

        {
            id: 1002,
            idLembrete: 1,
            texto: Precisa de pó
        }
    ]

*/

const baseObservacoes = {}

app.get('/lembretes/:idLembrete/observacoes', function(req, res){
    const idLembrete = req.params.idLembrete
    res.json(baseObservacoes[idLembrete] || {} )
})

app.post('/lembretes/:idLembrete/observacoes', async (req, res) => {

    const idObservacao = uuidv4()
    const { texto } = req.body
    const { idLembrete } = req.params
    const observacao = {

        id: idObservacao,
        idLembrete,
        texto

    }

    const observacoes = baseObservacoes[idLembrete] || []
    observacoes.push(observacao)
    baseObservacoes[idLembrete] = observacoes

    await axios.post('http://localhost:10000/eventos', {
        tipo: 'ObservacaoCriada',
        dados: observacao
    })

    res.status(201).json(observacao)
})

app.post('/eventos', (req, res) => {

    const evento = req.body
    console.log(evento)
    res.end()

})

const port = 5001

app.listen(port, () => {
    console.log(`Observações. Porta: ${port}`)
})