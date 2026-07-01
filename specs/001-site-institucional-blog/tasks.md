---
description: "Task list — Site institucional + blog Reflexões"
---

# Tasks: Site institucional + blog "Reflexões"

**Input**: Design documents from `specs/001-site-institucional-blog/`

**Status**: site já implementado; este arquivo formaliza as tasks por user story e isola as
**pendências**. Legenda: `[X]` concluída · `[ ]` pendente · `[B]` bloqueada (depende da cliente).

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup (infraestrutura compartilhada)

- [X] T001 Estrutura de pastas (`assets/{css,js,images,icons}`, `reflexoes/posts`) + `.nojekyll`
- [X] T002 `assets/css/styles.css` — tokens `:root` (paleta, tipografia fluida `clamp()`), reset
- [X] T003 [P] Fontes (Playfair Display + Lato) com `preconnect` + `display=swap` e fallbacks
- [X] T004 [P] Utilitários globais: container, `:focus-visible`, skip-link, `prefers-reduced-motion`

## Phase 2: Foundational (bloqueia as user stories)

- [X] T005 Header/nav fixo translúcido + botão Agendar + estado "scrolled"
- [X] T006 Footer (logo, nav, contato, frase, ano dinâmico)
- [X] T007 `assets/js/main.js` — menu mobile a11y (`Esc`/foco), header scrolled, ano dinâmico

**Checkpoint**: base pronta.

---

## Phase 3: User Story 1 — Visitante entende e agenda (P1) 🎯 MVP

- [X] T008 [US1] Esqueleto da home `index.html` (doctype, head SEO base, landmarks, skip-link)
- [X] T009 [US1] Hero (FRASE_HERO/HERO_APOIO/CTAs + foto placeholder) com `<h1>` único
- [X] T010 [US1] Texto introdutório (INTRO_P1/INTRO_P2)
- [X] T011 [US1] "Como funciona" — 4 blocos + ícones SVG inline
- [X] T012 [US1] "Sobre mim" (`#sobre`) — foto, textos, formação repetível, CTA
- [X] T013 [US1] "Áreas de atendimento" (`#psicanalise`) — grid repetível + ícones
- [X] T014 [US1] FAQ (`#faq`) — accordion `<details>/<summary>` (5 itens)
- [X] T015 [US1] Contato/CTA final (`#contato`) — WhatsApp/Instagram/E-mail/botão
- [X] T016 [US1] CTAs de agendamento recorrentes e acessíveis

**Checkpoint**: home converte e é navegável por teclado. ✅

---

## Phase 4: User Story 2 — Reflexões + descoberta por busca (P2)

- [X] T017 [US2] `reflexoes/_template-post.html` (head SEO + `<article>` + CTA)
- [X] T018 [P] [US2] Post 1 — Ansiedade (JSON-LD `Article`)
- [X] T019 [P] [US2] Post 2 — Autoestima/relacionamentos
- [X] T020 [P] [US2] Post 3 — Adolescência
- [X] T021 [US2] `reflexoes/index.html` — listagem (card por post)
- [X] T022 [US2] Conectar cards/CTA da home (`#reflexoes`) aos 3 posts e à listagem
- [X] T023 [US2] SEO: head único por página + JSON-LD (`ProfessionalService`+`Person`, `FAQPage`, `Article`)
- [X] T024 [US2] `sitemap.xml` + `robots.txt`

**Checkpoint**: blog publicado e indexável. ✅

---

## Phase 5: User Story 3 — Edição por leigos (P3)

- [X] T025 [US3] Placeholders de copy comentados em todas as seções
- [X] T026 [US3] Estruturas repetíveis (formação, áreas, cards) comentadas
- [X] T027 [US3] `README.md` — publicar, editar textos, adicionar post, trocar fotos/dados
- [X] T028 [US3] `assets/images/README.md` — guia de fotos (dimensões/formatos)

**Checkpoint**: manutenção sem código. ✅

---

## Phase 6: Polish & Cross-Cutting

- [X] T029 [P] Favicon/ícones do monograma "G" (SVG + PNG + ICO) + `site.webmanifest`
- [X] T030 [P] `404.html` amigável (caminhos absolutos para servir em qualquer profundidade)
- [X] T031 Deploy: `.github/workflows/deploy.yml` (GitHub Pages, zero build)
- [X] T032 Placeholders de imagem (hero, sobre, OG) em JPG com dimensões definidas
- [X] T033 QA: JSON-LD válido, links internos, 1 `<h1>`/página, FAQ↔JSON-LD, responsivo, teclado

### Pendências a fechar (foco do /speckit-implement)

- [X] T034 [P] Gerar **placeholders WebP** (hero, sobre, OG) a partir dos JPG, para o
      `<picture>` não cair em 404 enquanto não há fotos reais (FR-010 / contrato de mídia)
      ✅ Gerados via Pillow; menores que os JPG; `<picture>` resolve sem 404.
- [B] T035 Substituir fotos placeholder pelas **fotos reais** + WebP (cliente fornece)
- [B] T036 Substituir **placeholders** de URL canônica e dados de contato/CRP (go-live)
- [~] T037 Rodar **Lighthouse** ≥ 95 nas 4 categorias **após deploy** (SC-003) e registrar
      ↳ **Preliminar local ✅** (home): 99 / 100 / 100 / 100 — registrado em
        [lighthouse.md](./lighthouse.md). Corrigidos 2 defeitos de a11y (contraste na
        seção oliva; ordem de headings no rodapé) que travavam a meta.
      ↳ **Pós-deploy (oficial) pendente**: bloqueado até habilitar GitHub Pages
        (Settings → Pages → Source = "GitHub Actions"); o site ainda responde 404.

---

## Dependencies & Execution Order

- Phase 1 → Phase 2 → (US1, US2, US3 em paralelo possível) → Polish.
- T034 independe de tudo (só dos JPG existentes) → executável agora.
- T035/T036 bloqueadas por insumos da cliente. T037 depende de deploy.

## Notes

- Tests não solicitados na spec → sem tasks de teste (validação por checagens + Lighthouse).
- Commit por task/grupo lógico.
