---
description: "Task list — Painel de administração do blog (CMS)"
---

# Tasks: Painel de administração do blog (CMS)

**Input**: `specs/003-cms-blog/` (plan, spec, research, data-model, contracts, quickstart)
**Legenda:** `[P]` paralelizável · `[US#]` user story · `[B]` bloqueada (depende da usuária)

## Phase 1: Setup (infra Eleventy)
- [X] T001 Criar `package.json` com devDependency `@11ty/eleventy` e scripts `dev`/`build`
- [X] T002 Criar `.eleventy.js` (input `src/`, output `_site/`, passthrough de assets/estáticos, permalinks preservando `/reflexoes/posts/<slug>.html`)
- [X] T003 Mover arquivos servidos para `src/` (index.html, 404.html, assets/, robots.txt, site.webmanifest, .nojekyll) mantendo caminhos relativos
- [X] T004 [P] Atualizar `.gitignore` (ignorar `node_modules/` e `_site/`)

## Phase 2: Foundational (templates, migração, build) — bloqueia as user stories
- [X] T005 Extrair `src/_includes/base.njk` (head + CSS crítico + header + rodapé) do HTML atual
- [X] T006 Criar `src/_includes/post.njk` (layout do artigo + JSON-LD `Article`, herdando base)
- [X] T007 Criar coleção `post` no `.eleventy.js` (tag `post`, ordenar por `date` desc, excluir `draft`)
- [X] T008 [P] Converter os 3 posts atuais para Markdown em `src/reflexoes/posts/*.md` (front matter: title/date/description/tempoLeitura/tags), preservando slugs/URLs
- [X] T009 Gerar a listagem `src/reflexoes/index.njk` a partir da coleção (card por post, miniatura se houver `cover`)
- [X] T010 [P] Gerar `src/sitemap.njk` (home, listagem e posts publicados)
- [X] T011 Atualizar `.github/workflows/deploy.yml`: `npm ci` → `npx @11ty/eleventy` → upload `_site` → deploy
- [X] T012 Emendar a constituição (`.specify/memory/constitution.md` e `specs/constitution.md`): build permitido (Eleventy), output estático
- [X] T013 Validar build local (`npm run build`) — paridade visual/URLs com o site atual; sem erros

## Phase 3: US1 — Publicar novo post pelo painel (P1) 🎯 MVP
- [X] T014 [US1] Criar `admin/index.html` que carrega o Sveltia CMS
- [X] T015 [US1] Criar `admin/config.yml`: backend `github` (repo/branch), coleção "Reflexões" (campos title/date/description/cover/tempoLeitura/draft/body em PT), `media_folder` `src/assets/images/posts`. *(O backend git provê histórico/reversão de cada post — cobre FR-008.)*
- [X] T016 [US1] Passthrough de `admin/` no `.eleventy.js` e pasta `src/assets/images/posts/` (com `.gitkeep`)
- [X] T017 [US1] Verificar (local/preview): criar post de teste gera `.md` + página no padrão do site e aparece na listagem

## Phase 4: US4 — Acesso restrito e seguro (P1)
- [X] T018 [US4] Configurar `backend.base_url`/`auth_endpoint` no `admin/config.yml` para o handler OAuth
- [ ] T019 [B] [US4] Criar **GitHub OAuth App** (Client ID/Secret) — ação da usuária (ver quickstart)
- [ ] T020 [B] [US4] Publicar **Cloudflare Worker** `sveltia-cms-auth` com o segredo — ação da usuária
- [ ] T021 [B] [US4] (Se aplicável) Adicionar a autora como **colaboradora** (Write) — ação da usuária

## Phase 5: US2 — Editar post existente (P2)
- [X] T022 [US2] Confirmar que a coleção permite abrir/editar/salvar um post preservando a URL
- [X] T023 [US2] Verificar que a edição dispara build e reflete no site publicado

## Phase 6: US3 — Excluir post (P2)
- [X] T024 [US3] Confirmar exclusão pelo painel remove o `.md` e regenera listagem + sitemap (some da home se aplicável)

## Phase 7: Polish & Docs
- [X] T025 [P] Atualizar `README.md` (fluxo do painel para leigos) e alinhar `assets/images/README.md`.
      *(Documentar que os 3 cards de destaque da home são MANUAIS: excluir um post no CMS não
      remove o card da home — G1.)*
- [X] T026 [P] Atualizar `reflexoes/_template-post.html` (marcar como legado/manual, já que posts vêm do CMS)
- [X] T027 Verificação final: sem regressão (Lighthouse, AA, 1 `<h1>`, JSON-LD válido, sem scroll horizontal) e site público funciona sem o painel

## Dependencies & Execution Order
- Phase 1 → Phase 2 → US1(P1)/US4(P1) → US2/US3(P2) → Polish.
- T019–T021 são **ações da usuária** (OAuth/colaboradora); sem elas o login não funciona, mas
  o build/publicação por Git e o site seguem funcionando.
- MVP: **US1** (publicar) sobre a base (Phases 1–2) + login (US4).

## Notes
- Sem tarefas de teste (não solicitadas); validação por build local + preview + Lighthouse.
- Commit por fase/grupo lógico; PR mergeável ao final.
