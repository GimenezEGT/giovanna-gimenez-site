# HANDOFF — estado do projeto e próximos passos

_Última atualização: 2026-07-02_

## O que é
Site institucional + blog ("Reflexões / Caderno Clínico") da psicanalista **Giovanna Gimenez**.
- Repositório (público): **GimenezEGT/giovanna-gimenez-site**
- Publicado (GitHub Pages, subpath): **https://gimenezegt.github.io/giovanna-gimenez-site/**
- Fluxo de trabalho: **spec-kit** (`specs/`), branch → PR → merge → deploy automático.

## Arquitetura (importante)
- Site **estático**. A **home** (`src/index.html`) é HTML manual; o **blog** é gerado por
  **Eleventy** a partir de Markdown.
- Fonte em **`src/`**, saída em **`_site/`** (gitignored). Config: `.eleventy.js`, `package.json`.
- Templates: `src/_includes/base.njk` (head + CSS crítico + header/rodapé) e `post.njk`.
- Posts: `src/reflexoes/posts/*.md`. Listagem (`src/reflexoes/index.njk`) e `src/sitemap.njk`
  são **gerados** da coleção — publicar/excluir post atualiza tudo sozinho.
- Deploy: `.github/workflows/deploy.yml` faz `npm ci` + `eleventy` + publica no Pages.
- Node é necessário só para build local (`npm install` && `npm run dev`). Nota: em novos
  terminais o PATH do Node pode não estar carregado; recarregar do registro se `node` sumir.

## Features concluídas
- **001** site institucional + blog · **002** refinamento visual · identidade oficial (logo/
  paleta brand board) · **003** painel do blog (Sveltia CMS + Eleventy) — TUDO no ar.

## TAREFA ATUAL: ligar o LOGIN do painel do blog
O painel **`/admin/`** (Sveltia CMS) já está no ar e abre, mas o **login com GitHub ainda não
funciona** — falta hospedar o "handler de OAuth" (troca o código do GitHub por token, guardando
o client secret). Specs: `specs/003-cms-blog/` (quickstart tem o passo a passo original).

### Já existe
- **GitHub OAuth App** criado (o usuário tem Client ID/Secret).
- `src/admin/config.yml`: backend github, coleção "Reflexões" em PT. Campo **`base_url`** está
  com **placeholder** `https://SEU-WORKER-OAUTH.workers.dev` — precisa virar a URL do handler.

### Bloqueios encontrados (por isso ainda não terminou)
1. **Netlify**: a conta/equipe ("Gemfy") **ficou sem créditos** → deploys desativados. Netlify
   fora como opção no momento (e o site na Netlify está desatualizado).
2. **Cloudflare Worker** (`sveltia-cms-auth`): o deploy sobe, mas falha no fim com
   _"You need to register a workers.dev subdomain"_. A conta Cloudflare **não registrou o
   subdomínio** e o painel não mostrou a opção. Tentativas via link de onboarding falharam.

## PRÓXIMOS PASSOS (escolher um caminho para o handler de OAuth)

**Caminho A — Cloudflare (destravar o subdomínio):**
- Forçar o registro criando um Worker "Hello World" pelo painel (Create → Create Worker →
  Deploy), que obriga a escolher o subdomínio; depois **Retry** no `sveltia-cms-auth`.
- Ou registrar o subdomínio em Workers & Pages → Overview / Settings.

**Caminho B — trocar de hospedagem do handler (se a Cloudflare continuar travando):**
- Usar **Deno Deploy** (gratuito, sem subdomínio problemático) rodando um proxy OAuth
  compatível com Decap/Sveltia, OU Vercel. Requer criar conta e subir ~1 arquivo.

**Depois que o handler estiver no ar (qualquer caminho):**
1. Definir no handler as variáveis `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET`.
2. No **GitHub OAuth App**: callback = `https://<URL-do-handler>/callback`.
3. Editar `src/admin/config.yml`: trocar `base_url` pela URL do handler (commit + PR + merge).
4. Testar: acessar `…/admin/` → **Entrar com GitHub** → criar um post de teste → confirmar
   que aparece em `/reflexoes/` após o build (~1–2 min).
5. (Se a Giovanna for publicar) adicioná-la como **colaboradora** (Write) no repo.

## Pendências de conteúdo (independentes do painel)
- Fotos reais (hero/sobre são SVG hoje), `og-image` real, dados de contato reais.
- Domínio próprio (quando existir: configurar CNAME/DNS e trocar a URL base do subpath).

## Notas
- Ambiente local: `python` do PATH é o do LibreOffice (sem pip); usar Node via
  `C:\Program Files\nodejs`. `uv`/`uvx` disponível.
- Não mergear o PR #1 (revisão, base `baseline-site`). Há branches antigos já mesclados
  que podem ser apagados.
