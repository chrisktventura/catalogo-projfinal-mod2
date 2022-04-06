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
  res.render("index", { lugares: lugares, message });
});

app.get("/cadastrar", (req, res) => {
   res.render("cadastrar", {lugares: lugares});
});

app.post("/cadastrar", async (req, res) => {
  try {
      const { lugar, frase, descricao, estrutura, atividades, imagem } = req.body;    
      if(!lugar) {
        message = "Preencha o nome do lugar";
          return res.redirect("/cadastrar");
      }
      await Lugar.create({
        lugar,
        frase,
        descricao,
        estrutura,
        atividades,
        imagem
      });
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
      message: `${lugar.lugar} não encontrado!`,
    });
  }

  res.render("editar", {
    lugar, message: ""
  });
});

app.post("/editar/:id", async (req, res) => {
  lugar = await Lugar.findByPk(req.params.id);
  console.log(lugar);

  const { lugar, frase, descricao, estrutura, atividades, imagem } = req.body;

  lugar.lugar = lugar;
  lugar.frase = frase;
  lugar.descricao = descricao;
  lugar.estrutura = estrutura;
  lugar.atividades = atividades;
  lugar.imagem = imagem;

  const lugarEditado = await lugar.save();
  console.log(lugarEditado);

  res.render("editar", {
    lugar: lugarEditado,
    message: "Atulização efetuada com sucesso!",
  });
});


app.get("/deletar/:id", async (req, res) => {
  const lugar = await Lugar.findByPk(req.params.id);

  if (!lugar) {
    res.render("deletar", {
      message: "Lugar não encontrado!",
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
      message: "Lugar não encontrado!",
    });
  }

  await lugar.destroy();
  res.redirect("/");
});


// app.post("/detalhes/:id", async (req, res) => {
//   const lugar = await Lugar.findByPk(req.params.id);
//   console.log(lugar)
  
//   if (!lugar) {
//     res.render("detalhes", {
//       message: "Lugar não encontrado!",
//     });
//   }
  
//   lugar.destroy();
 
//   res.redirect("/", {
    
//     message: `Lugar ${lugar.lugar} deletado com sucesso!`,
//   });
// });
 
  
app.get("/sobre", (req, res) => {
    res.render("sobre");
  });
//});
  


app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
