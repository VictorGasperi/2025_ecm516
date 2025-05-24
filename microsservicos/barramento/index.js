const axios = require("axios");
const express = require("express");

const app = express();
app.use(express.json());

const eventos = []

app.get("/eventos", (req, res) => {
  res.json(eventos)
})

app.post("/eventos", async (req, res) => {
  // 1. Pegar o evento
  const evento = req.body;

  console.log(evento);

  eventos.push(evento)

  // Múltiplos try/catch para, caso um pare de funcionar, o outro ainda funciona
  // 2. Enviar o evento para o mss lembretes
  try {
    await axios.post("http://localhost:4000/eventos", evento);
  } catch (error) {
    console.log(error);
  }

  // 3. Enviar o evento para o mss observacoes
  try {
    await axios.post("http://localhost:5001/eventos", evento);
  } catch (error) {
    console.log(error);
  }

  // 4. Envia o evento para o mss consulta
  try {
    await axios.post("http://localhost:6000/eventos", evento);
  } catch (error) {
    console.log(error);
  }

  // 5. Envia o evento para o mss classificacao
  try {
    await axios.post("http://localhost:7001/eventos", evento);
  } catch (error) {
    console.log(error);
  }

  // 6. Responder
  res.end();
});

const port = 10000;
app.listen(port, () => {
  console.log(`Barramento. Porta: ${port}`);
});
