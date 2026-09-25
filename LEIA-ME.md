# 🎀 Convite Surpresa — Julia (16 anos)

Site de convite para a festa surpresa da Julia, com um **link individual para cada convidado**.
Assim, ninguém vê a lista completa e fica mais fácil manter o segredo.

## 📁 Arquivos do projeto

| Arquivo          | Para que serve                                                        |
|------------------|-----------------------------------------------------------------------|
| `index.html`     | O convite em si (o que os convidados abrem)                           |
| `style.css`      | O visual (tema rosa, animações)                                       |
| `script.js`      | A lógica do convite (lê o link, personaliza, salva presença)          |
| `convidados.js`  | A lista de convidados e os dados da festa — **edite este arquivo**    |
| `admin.html`     | Seu painel: gera os links e mostra quem confirmou (**só para você**)  |

> ⚠️ **Nunca mande `convidados.js` nem `admin.html` para a Julia.** Eles têm a lista completa.

---

## 🚀 Como usar (passo a passo)

### 1. Testar no seu computador
- Dê **dois cliques em `index.html`** para ver o convite. Ele vai mostrar "convite não encontrado" porque falta o código na URL — isso é normal.
- Abra **`admin.html`** para ver o painel com todos os convidados e os links de teste.
- Clique em **"Copiar"** em qualquer linha e cole o link no navegador para testar aquele convite específico.

### 2. Ajustar os dados
Abra o arquivo **`convidados.js`** e edite:
- Os **nomes** dos convidados (troque "Convidado 1", "Convidado 2"...).
- O objeto **`FESTA`**: horário, local (coloque o endereço real), etc.

Você também pode editar os nomes direto no painel `admin.html` (fica salvo no navegador).

No painel você ainda pode **adicionar** convidados (botão "+ Adicionar convidado") e
**remover** qualquer um (botão "Remover" na linha). Essas mudanças ficam salvas neste navegador.

### 3. Colocar o site na internet (grátis)
Para os convidados abrirem pelo celular, o site precisa estar online. Opção fácil e gratuita:

**Netlify Drop** (não precisa criar nada complicado):
1. Acesse https://app.netlify.com/drop
2. Arraste a **pasta inteira** do projeto para a página.
3. Em segundos você recebe um endereço tipo `https://algo-aleatorio.netlify.app`.

> Dica de segredo: o endereço é neutro, não coloca "aniversário" nem o nome da Julia. 👍

### 4. Gerar os links finais
1. Abra o **`admin.html`** (pode ser online ou local).
2. No campo **"Endereço base do site"**, cole o endereço que o Netlify te deu (ex.: `https://algo-aleatorio.netlify.app`).
3. Clique em **"Gerar / atualizar links"**.
4. Use **"Copiar"** em cada convidado, ou **"Copiar todos os links"** para pegar a lista inteira de uma vez.

Cada convidado recebe um link assim:
```
https://algo-aleatorio.netlify.app/index.html?c=aK7pQ2&n=Maria
```

> O nome vai embutido no link (`&n=`). É isso que faz os convidados que você
> **adiciona no painel** funcionarem na hora, sem precisar editar o `convidados.js`.
> Como cada pessoa recebe só o próprio link, o nome que aparece na URL é o dela mesma.

### 5. Enviar
Mande para cada pessoa **apenas o link dela** (WhatsApp, etc.). O convite já vem com o nome dela e um lembrete de que é surpresa.

---

## ✅ Confirmação de presença (RSVP)
Quando o convidado abre o convite, ele pode clicar em **"Sim, vou!"** ou **"Não vou poder"**.

Se clicar em **"Sim, vou!"**, aparecem automaticamente as instruções:
- 👙 Levar roupa de banho
- 🥩 Kit crente: 300g de carne e 1 bebida
- 📍 Botão com o link da localização (Housing Alphaville Flamboyant, Goiânia)

> Você pode editar essas instruções e o link do mapa no arquivo `convidados.js`
> (campos `instrucoesPresenca` e `linkLocalizacao`).

⚠️ **Importante entender:** essa resposta fica salva **no celular do próprio convidado**, não vem automaticamente para você. Para essa base simples (sem servidor), o jeito prático é o convidado te avisar, ou você perguntar. 

Se você quiser que as confirmações cheguem **de verdade até você** (um painel real mostrando "fulano confirmou"), dá para evoluir o projeto usando um serviço como o **Firebase** ou um formulário (Google Forms / Formspree). É só pedir que eu monto essa parte.

---

## 🔒 Sobre o segredo
- Cada pessoa só tem o próprio link — não existe página pública com a lista.
- O título da aba e o endereço são neutros.
- O convite avisa que é surpresa.

Limite honesto: qualquer pessoa que receba um link pode reencaminhá-lo. O segredo depende dos convidados serem discretos. Para 13 pessoas de confiança, isso costuma ser o suficiente. 💗
