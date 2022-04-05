const express = require("express");
const { url } = require("inspector");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const Lugar = require("./models/database/lugar");

const app = express();

const port = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());
app.use(expressLayouts);

let lugares = undefined;
let message = "";


app.get("/", async(req, res) => {
  const lugares = await Lugar.findAll();
  res.render("index", { lugares });
});

// app.get("/lugares/:id", async (req, res) => {
//   const lugar = await Lugar.findByPk(req.params.id);

//   res.render("detalhes", {
//     filme,
//   });
// });

app.get("/cadastrar", (req, res) => {
   res.render("cadastrar", {lugares});
});

app.get("/editar", (req, res) => {
  res.render("editar");
});

app.get("/detalhes", (req, res) => {
  res.render("detalhes");
});

app.get("/sobre", (req, res) => {
  res.render("sobre");
});

// app.post("/create", async (req, res) => {
//   const { lugar, frase, descricao, atividades, estrutura, imagem } = req.body;
  
//   const lugares = await Lugares.create({
//     lugar,
//     frase,
//     descricao,
//     atividades,
//     estrutura,
//     imagem,
//   });

//   res.render("cadastro", { lugares });
    
//   });



app.post("/cadastrar", async (req, res) => {
  const { lugar, frase, descricao, atividades, estrutura, imagem } = req.body;
  const lugares = await Lugar.create({
      lugar,
      frase,
	descricao,
	atividades,
	estrutura,
      imagem,
    });

  res.redirect('/', {lugares});
});

  




// app.post("/formulario", (req, res) => {
//   lugar = req.body;
  
//   catalogo.push(lugar);
//   lugar = undefined;
//   message = `Seu cadastro foi efetuado com sucesso!`;
//   setTimeout(() => {
//     message = "";
//   }, 1000);
//   res.redirect("/");
// });


app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
