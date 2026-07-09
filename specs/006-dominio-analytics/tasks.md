---
description: "Task list — Migração de domínio (site-raiz) + Google Analytics"
---

# Tasks: Migração de domínio (site-raiz) + Google Analytics

**Input**: `specs/006-dominio-analytics/` (spec.md, plan.md) · Legenda: `[ ]` pendente · `[X]`
feita · `[P]` paralelizável (arquivos diferentes, sem dependência)

**Escopo**: config/metadados (URL base) + config do CMS + snippet GA4. Sem mudança de
layout/estilo/conteúdo (FR-011).

## Phase 1: Setup

- [X] T001 Levantar todas as ocorrências do domínio/subpath antigo servido:
      `https://gimenezegt.github.io/giovanna-gimenez-site` em `src/` (arquivos que vão para
      `_site`: `src/_data/site.json`, `src/index.html`, `src/robots.txt`, `src/404.html`,
      `src/admin/config.yml`) — confirmar a lista antes de editar

## Phase 2: US1 — Site correto no domínio da cliente (P1) 🎯 MVP

**Meta**: todas as URLs de SEO/metadados usam `https://giovannapsicanalista.github.io` na raiz.
**Teste independente**: inspecionar `<head>`/sitemap/robots no build e ver o domínio novo (raiz),
sem ocorrência do antigo, com navegação/assets funcionando.

- [X] T002 [US1] Editar `src/_data/site.json`: `url` → `https://giovannapsicanalista.github.io`
      (sem barra final) — corrige canonical/OG do blog, `sitemap.xml` e JSON-LD dos posts
- [X] T003 [P] [US1] Em `src/index.html`, substituir a base
      `https://gimenezegt.github.io/giovanna-gimenez-site` → `https://giovannapsicanalista.github.io`
      (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`/`image`, comentário)
- [X] T004 [P] [US1] Em `src/robots.txt`, atualizar a linha `Sitemap:` para o domínio novo (raiz)
- [X] T005 [P] [US1] Em `src/404.html`, substituir a base antiga pelo domínio novo nos 3 links
      absolutos (favicon, CSS, botão "voltar ao início")

## Phase 3: US2 — Google Analytics em todas as páginas (P1)

**Meta**: home, listagem do blog, posts e 404 carregam o GA4 `G-EPFLCGTMPV` de forma assíncrona.
**Teste independente**: abrir cada tipo de página e confirmar o script do GA4 no `<head>` e o
carregamento assíncrono.

- [X] T006 [P] [US2] Inserir o snippet `gtag.js` (async) do GA4 `G-EPFLCGTMPV` no `<head>` de
      `src/index.html` (home)
- [X] T007 [P] [US2] Inserir o mesmo snippet no `<head>` de `src/_includes/base.njk` (cobre a
      listagem do blog e todos os posts)
- [X] T008 [P] [US2] Inserir o mesmo snippet no `<head>` de `src/404.html`

## Phase 4: US3 — CMS apontando para o repo da cliente (P3)

**Meta**: `config.yml` do painel aponta para o repositório e a pasta pública corretos (raiz).
**Teste independente**: inspecionar `src/admin/config.yml`.

- [X] T009 [US3] Em `src/admin/config.yml`: `repo` →
      `giovannapsicanalista/giovannapsicanalista.github.io` e `public_folder` → `/assets/images/posts`

## Phase 5: QA & Polish

- [X] T010 Build Eleventy (`npm run build`) e conferir no `_site`: **0** ocorrências de
      `gimenezegt.github.io`/`giovanna-gimenez-site` em `index.html`, `robots.txt`, `sitemap.xml`,
      `404.html`, `reflexoes/index.html` e um post; canonical/OG/sitemap com o domínio novo (raiz)
- [X] T011 [P] Preview servindo `_site` na **raiz**: navegação e assets (CSS, imagens, logo)
      carregam sem link quebrado (home, blog, post, 404); **0** erros de console
- [X] T012 [P] Confirmar o GA4 `G-EPFLCGTMPV` presente e assíncrono nas 4 páginas
      (home, listagem, post, 404); page_view dispara (network para `googletagmanager.com`)
- [ ] T013 [P] Performance (SC-003): Lighthouse/PSI **≥ 95** (mobile e desktop) com o analytics.
      Preliminar local + oficial pós-deploy
- [X] T014 Abrir PR mergeável (base=main)

## Dependencies & Execution Order

- Phase 1 (Setup) → US1 → US2 → US3 → QA.
- T002–T005 (US1) tocam arquivos diferentes → paralelizáveis entre si.
- T006–T008 (US2) tocam arquivos diferentes → paralelizáveis; T006 e T003 tocam o mesmo
  `src/index.html` → **sequenciais** (fazer T003 antes de T006 ou vice-versa, sem conflito).
- T010 depende de todas as edições; T011/T012/T013 são checagens independentes.

## Parallel Opportunities

- US1: T003, T004, T005 em paralelo (T002 idem, arquivo distinto).
- US2: T007, T008 em paralelo; T006 sequencial ao T003 (mesmo arquivo).
- QA: T011, T012, T013 independentes.

## Implementation Strategy

- **MVP = US1 + US2** (domínio correto + analytics) — é o objetivo do handoff. US3 (CMS) agrega
  para quando a cliente for editar posts.
- Mudança cirúrgica: nenhuma alteração de layout/estilo/conteúdo (FR-011).

## Notes

- Sem tasks de teste automatizado (validação por build + preview + inspeção), conforme a spec.
- Pré-requisito externo (fora do código): o repositório na conta da cliente deve se chamar
  `giovannapsicanalista.github.io` e o Source do Pages = "GitHub Actions". O OAuth do CMS (Worker) é
  reconfigurado à parte.
