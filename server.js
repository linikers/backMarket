const express = require("express");
const fs = require("fs");
const app = express();

let listaDados = [];

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.get("/", (req, res) => {
  res.send("server Online");
});

app.get("/ler-arquivo", (req, res) => {
  fs.readFile("arquivo.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.staus(500).send("Erro ao ler arquivo");
    }
    res.send(data);
  });
});

app.post("/salvar-dados", (req, res) => {
  const novosDados = req.body;

  listaDados.push(novosDados);

  fs.writeFile("arquivo.txt", JSON.stringify(listaDados), (err) => {
    if (err) {
      console.error(err);
      return res.staus(500).send("Erro ao salvar");
    }
    res.send("Dados enviados");
  });
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
