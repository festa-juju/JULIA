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

**Agora existe um painel ao vivo de verdade** usando o Firebase. Veja a seção abaixo para ativá-lo.

---

## 🔥 Painel de presenças ao vivo (Firebase)

Com isto ligado, quando um convidado confirma no celular dele, a resposta aparece
**automaticamente no seu painel** (`admin.html`), em qualquer aparelho. É gratuito.

Você faz isto **uma vez**. Depois é só usar.

### Passo 1 — Criar o projeto no Firebase
1. Acesse https://console.firebase.google.com e entre com sua conta Google.
2. Clique em **"Adicionar projeto"** (ou "Create a project").
3. Dê um nome qualquer (ex.: `festa-julia`). Pode pular o Google Analytics.
4. Espere criar e clique em **Continuar**.

### Passo 2 — Criar o banco (Firestore)
1. No menu à esquerda, vá em **Build → Firestore Database**.
2. Clique em **Criar banco de dados**.
3. Escolha **"Iniciar em modo de teste"** (test mode) e confirme.
   - Modo de teste libera leitura/escrita por ~30 dias. Suficiente para a festa.
   - (Se preferir deixar aberto além disso, dá para ajustar as regras depois.)
4. Escolha a região mais próxima (ex.: `southamerica-east1`) e ative.

### Passo 3 — Pegar a configuração (a "chave")
1. Clique na engrenagem ⚙️ (ao lado de "Visão geral do projeto") → **Configurações do projeto**.
2. Role até **"Seus aplicativos"** e clique no ícone **`</>`** (app da Web).
3. Dê um apelido (ex.: `convite`) e clique em **Registrar app**.
4. O Firebase mostra um bloco parecido com este:
   ```js
   const firebaseConfig = {
     apiKey: "AIza........",
     authDomain: "festa-julia.firebaseapp.com",
     projectId: "festa-julia",
     storageBucket: "festa-julia.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123...:web:abc..."
   };
   ```

### Passo 4 — Colar no arquivo `firebase-config.js`
1. Abra o arquivo **`firebase-config.js`** aqui no projeto.
2. Substitua os valores `"COLE_AQUI..."` pelos valores que o Firebase te deu.
3. Salve.

### Passo 5 — Subir de novo pro GitHub
Faça upload do `firebase-config.js` (e dos outros arquivos alterados) para o
repositório, como você já fez antes. Pronto.

### Como saber se funcionou
- Abra o **`admin.html`**. No topo deve aparecer **"🟢 Painel ao vivo ativo"**.
- Peça pra alguém (ou você mesmo, de outro celular) abrir um convite e clicar em
  **"Sim, vou!"**. Em segundos, a linha da pessoa no painel muda para **"Vai"**.

> Se aparecer "⚪ Painel ao vivo desligado", é porque o `firebase-config.js`
> ainda está com os valores `COLE_AQUI`. Refaça o Passo 4.

---

## 🔒 Sobre o segredo
- Cada pessoa só tem o próprio link — não existe página pública com a lista.
- O título da aba e o endereço são neutros.
- O convite avisa que é surpresa.

Limite honesto: qualquer pessoa que receba um link pode reencaminhá-lo. O segredo depende dos convidados serem discretos. Para 13 pessoas de confiança, isso costuma ser o suficiente. 💗
