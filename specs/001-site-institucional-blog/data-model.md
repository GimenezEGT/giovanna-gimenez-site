# Data Model — "Entidades" de conteúdo

Sem banco de dados. As "entidades" são estruturas de conteúdo em arquivos estáticos.

## Post de Reflexão
- **arquivo/slug**: nome do HTML em `reflexoes/posts/` (sem acento/espaço, com hífens).
- **título**: `<h1>` único + `<title>`.
- **data**: `<time datetime="AAAA-MM-DD">` + JSON-LD `datePublished`.
- **tempo de leitura**: texto (ex.: "4 min").
- **resumo**: usado no card da listagem/home e em OG description.
- **conteúdo**: `<article>` com `<h2>`/`<p>`.
- **CTA**: bloco final de agendamento.
- **aparições**: card na listagem (`reflexoes/index.html`), opcional na home, entrada no
  `sitemap.xml`, JSON-LD `Article`.

## Bloco de conteúdo editável
- **rótulo**: ex. `FRASE_HERO`, `INTRO_P1`, `SOBRE_TEXTO`.
- **delimitadores**: `<!-- RÓTULO:início -->` … `<!-- RÓTULO:fim -->` (ou comentário único).
- **valor padrão**: texto preenchido.

## Item repetível
- **tipos**: formação (`<li>`), área de atendimento (`<li class="area">`), card de post.
- **regra**: copiar/remover o bloco comentado sem tocar em CSS/JS.

## Dado de contato (placeholder)
- **tipos**: WhatsApp (`5511999999999`), telefone exibido (`(11) 99999-9999`), e-mail
  (`contato@giovannagimenez.com.br`), Instagram (`giovannagimenez.psicanalise`),
  CRP (`00/00000`), URL canônica (`https://SEU-USUARIO.github.io/SEU-REPO/`).
- **regra**: localizar-e-substituir em todos os arquivos (ver README).
