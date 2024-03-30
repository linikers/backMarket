const express = require("assert");
const fs = require("fs");
const app = express();

app.get("ler-arquivo", (req, res) => {
  fs.readFile("arquivo.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.staus(500).send("Erro ao ler arquivo");
    }
    res.send(data);
  });
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
