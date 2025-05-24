const axios = require("axios");
const express = require("express");

const app = express();

app.use(express.json()); // middleware que modela a requisição

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

const baseConsolidada = {};

const bustaEventos = () =>
  axios
    .get("http://localhost:10000/eventos")
    .then((res) =>
      res.data.forEach(async (evento) => {
        try {
          await funcoes[evento.tipo](evento.dados);
        } catch (err) {
          console.log(err);
        }
      })
    )
    .catch((err) => console.log(err));

// Mapa de Funcoes, para evitar quebrar o principio Open Closed
const funcoes = {
  LembreteCriado: async (lembrete) => {
    baseConsolidada[lembrete.id] = lembrete;
  },
  ObservacaoCriada: async (observacao) => {
    // Verifica se o array observacoes existe dentro do lembrete. Caso não exista, cria ela
    const observacoes =
      baseConsolidada[observacao.idLembrete]["observacoes"] || [];
    observacoes.push(observacao);
    baseConsolidada[observacao.idLembrete]["observacoes"] = observacoes; // ponteiro aponta para ele mesmo, caso seja a lista vazia
  },
  ObservacaoAtualizada: async (observacao) => {
    const objIndex = baseConsolidada[observacao.idLembrete][
      "observacoes"
    ].findIndex((obj) => obj.id === observacao.id);

    baseConsolidada[observacao.idLembrete]["observacoes"][objIndex] =
      observacao;
  },
};

app.get("/lembretes", (req, res) => {
  res.json(baseConsolidada);
});

app.post("/eventos", async (req, res) => {
  try {
    const evento = req.body;
    console.log(evento);
    await funcoes[evento.tipo](evento.dados);
  } catch (err) {
    console.log(err);
  } finally {
    res.end();
  }
});

const port = 6000;
app.listen(port, () => {
  console.log(`Consulta. Porta ${port}`);

  bustaEventos()

});
