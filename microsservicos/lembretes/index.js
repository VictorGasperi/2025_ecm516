const express = require('express');
const app = express();

// define a função middleware do express
app.use(express.json()) 



const baseLembretes = {};
let id = 1;

app.get('/lembretes', (req, res) => {
    res.json(baseLembretes);
});

app.post('/lembretes', (req, res) => {

    const { texto } = req.body;

    // É a mesma coisa que
    // const lembrete = {
    //     id: id,
    //     texto: texto
    // }

    const lembrete = {
        id,
        texto
    }

    baseLembretes[id] = lembrete
    id++

    res.status(201).json(lembrete)

});

const port = 4000

app.listen(port, () => {
    console.log(`Lembretes. Porta: ${port}`)
})
