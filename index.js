const express = require("express");
const { url } = require("inspector");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const Lugar = require("./models/lugar");

const app = express();

const port = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());
app.use(expressLayouts);

let lugares = undefined;
let message = "";
let lugar = undefined;

app.get("/", async(req, res) => {
  setTimeout(() => {
    message="";
}, 5000);
  const lugares = await Lugar.findAll();
  res.render("index", { lugares: lugares, message: message });
});

app.get("/cadastrar", (req, res) => {
   res.render("cadastrar", {lugares: lugares});
});

app.post("/cadastrar", async (req, res) => {
  try {
      const lugar = req.body;

      if(!lugar) {
          return res.redirect("/cadastrar");
      }

      await Lugar.create(lugar);
      message = `Seu cadastro foi realizado com sucesso!`;
      setTimeout(() => {
      message = "";
}, 1000);
      res.redirect("/");
  } catch (err){
      res.status(500).send({
          err: err.message || "Algum erro ocorreu ao carregar os dados."
      });
  }
});

app.get("/detalhes/:id", async (req, res) => {
  const lugar = await Lugar.findByPk(req.params.id);
  res.render("detalhes", { lugar: lugar });
});

app.get("/editar/:id", async (req, res) => {
  const lugar = await Lugar.findByPk(req.params.id);

  if (!lugar) {
    res.render("editar", {
      message: ` ${lugares.lugar} não encontrado!`,
    });
  }

  res.render("editar", {
    lugar,
  });

app.post("/editar", (req, res) => {
    try {
        const lugar = req.body;
        Lugar.update(lugar, {where: {id: req.params.id}});
        message = ` ${lugares.lugar} editado com sucesso!`,
        res.redirect("/");
    } catch (err){
        res.status(500).send({
            err: err.message || "Algum erro ocorreu ao carregar os dados."
        });
    }
});

app.get("/deletar/:id", async (req, res) => {
  const lugar = await Lugar.findByPk(req.params.id);

  if (!lugar) {
    res.render("deletar", {
      message: "Filme não encontrado!",
    });
  }

  res.render("deletar", {
    lugar,message: ""
  });
});

app.post("/deletar/:id", async (req, res) => {
  const lugar = await Lugar.findByPk(req.params.id);

  if (!lugar) {
    res.render("deletar", {
      message: "Filme não encontrado!",
    });
  }

  await lugar.destroy();
  res.redirect("/");
});
 
  
app.get("/sobre", (req, res) => {
    res.render("sobre");
  });
});
  


app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
