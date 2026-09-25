/*
  Lista de convidados e seus códigos únicos.

  Cada convidado tem:
    - codigo: o código secreto que aparece na URL (?c=CODIGO)
    - nome:   o nome que aparece no convite

  Você pode editar os nomes aqui à vontade.
  Para gerar novos códigos, use o painel (admin.html) ou troque manualmente.

  IMPORTANTE: não compartilhe este arquivo com a Julia. Ele contém a lista
  completa de convidados. Cada pessoa recebe apenas o próprio link.
*/

const CONVIDADOS = [
  { codigo: "aK7pQ2", nome: "Convidado 1" },
  { codigo: "X9mL4b", nome: "Convidado 2" },
  { codigo: "qP82Ls", nome: "Convidado 3" },
  { codigo: "4Xz7Ra", nome: "Convidado 4" },
  { codigo: "T3nH9k", nome: "Convidado 5" },
  { codigo: "bW6yE1", nome: "Convidado 6" },
  { codigo: "mZ2vK8", nome: "Convidado 7" },
  { codigo: "Rp5Qd3", nome: "Convidado 8" },
  { codigo: "hJ8fN4", nome: "Convidado 9" },
  { codigo: "cV1sB7", nome: "Convidado 10" },
  { codigo: "yD9wG2", nome: "Convidado 11" },
  { codigo: "kL4tM6", nome: "Convidado 12" },
  { codigo: "zA7pX3", nome: "Convidado 13" }
];

// Dados da festa — edite aqui se algo mudar.
const FESTA = {
  aniversariante: "Julia",
  idade: 16,
  data: "11 de outubro de 2026",
  diaSemana: "domingo",
  horario: "Depois da igreja (12h)",
  local: "Housing Alphaville Flamboyant — Casa 278",
  observacao: "É SEGREDO! Não conte pra Julia 🤫",

  // Informações que só aparecem quando a pessoa CONFIRMA presença.
  instrucoesPresenca: [
    "👙 Levar roupa de banho",
    "🥩 Kit crente: 300g de carne e 1 bebida"
  ],
  // Link do Google Maps para o local da festa.
  linkLocalizacao: "https://www.google.com/maps/search/?api=1&query=Housing+Alphaville+Flamboyant+Goi%C3%A2nia"
};
