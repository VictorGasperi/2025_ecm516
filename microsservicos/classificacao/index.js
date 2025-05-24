const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());

const funcoes = {
  ObservacaoCriada: async (observacao) => {
    const texto = observacao.texto;

    if (texto.includes("importante")) {
      observacao.status = "importante";
    } else {
      observacao.status = "comum";
    }

    await axios.post("http://localhost:10000/eventos", {
      tipo: "ObservacaoClassificada",
      dados: observacao,
    });
  },
};

app.post("/eventos", async (req, res) => {
  // descarte para eventos que nao sao de interesse
  try {
    const evento = req.body;
    console.log(evento);
    await funcoes[evento.tipo](evento.dados);
  } catch (err) {
    console.log(err)
  } finally {
    res.end();
  }
});

const port = 7001;
app.listen(port, () => {
  console.log(`Classificacao. Porta: ${port}`);
});
