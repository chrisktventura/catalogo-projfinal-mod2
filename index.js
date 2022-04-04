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

let lugar = undefined;
let message = "";


app.get("/", async(req, res) => {
  const lugares = await Lugar.findAll();
  console.log(lugares)
  res.render("index", { lugares });
});

app.get("/cadastrar", (req, res) => {
  res.render("cadastrar", catalogo);
});

app.post("/formulario", (req, res) => {
  lugar = req.body;
  lugar.id = nextId;
  nextId++;
  catalogo.push(lugar);
  lugar = undefined;
  message = `Seu cadastro foi efetuado com sucesso!`;
  setTimeout(() => {
    message = "";
  }, 1000);
  res.redirect("/");
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

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
