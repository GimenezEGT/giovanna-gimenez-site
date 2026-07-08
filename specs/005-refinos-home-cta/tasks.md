---
description: "Task list — Refinos da home (hero above-the-fold, link agendar, foto intro, FAQ)"
---

# Tasks: Refinos da home — hero above-the-fold, foto no intro, FAQ e link

**Input**: `specs/005-refinos-home-cta/` (spec.md, plan.md) · Legenda: `[ ]` pendente · `[X]` feita
· `[P]` paralelizável (arquivos/regiões diferentes, sem dependência)

**Escopo**: apenas a home (`src/index.html`) + CSS (`src/assets/css/styles.css` + bloco crítico
inline) + 1 asset novo de imagem. Sem JS novo. Nenhuma outra página/seção (FR-010).

## Phase 1: Setup

- [X] T001 Verificar baseline em `src/index.html`: frase do hero atual (`.hero__frase`), 3 CTAs de
      agendar apontando para `wa.me` (nav ~l.155, hero ~l.187, CTA final ~l.425), bloco
      `section.intro` ("Existem momentos…") com `INTRO_P1`/`INTRO_P2`, item de FAQ "Aceita
      convênio?" (visível ~l.388 + JSON-LD ~l.123), seção `.contato__canais` (~l.410-423)
- [X] T002 [P] Preparar o asset da foto do intro: converter `capa_gigi_2.png` (2248×1888) em
      `src/assets/images/intro-atmosfera.webp` + fallback `intro-atmosfera.jpg`, redimensionada
      (~1600px de largura) e comprimida; registrar as dimensões finais para o `width/height`

## Phase 2: US1 — CTA visível na primeira dobra (P1) 🎯 MVP

**Meta**: reduzir a frase do hero para o botão primário caber na primeira dobra sem rolar.
**Teste independente**: desktop ~1366×768 e mobile ~390×844 mostram o CTA do hero sem scroll.

- [X] T003 [US1] Reduzir a escala tipográfica de `.hero__frase` na seção HERO de
      `src/assets/css/styles.css` (menor `clamp()` e, se preciso, `margin`/`line-height`),
      preservando legibilidade AA e o texto da frase
- [X] T004 [US1] Espelhar a nova regra de `.hero__frase` no **bloco de CSS crítico inline** de
      `src/index.html` (above-the-fold), evitando flash do tamanho antigo

## Phase 3: US2 — Link oficial de agendamento + contato (P1)

**Meta**: todos os CTAs de agendar levam a `https://corpora.bio/2d251bdb0e`; área de contato
mantém WhatsApp/e-mail/Instagram (placeholders). **Teste independente**: clicar cada botão
"Agendar" abre o link oficial em nova aba; a seção de contato lista os 3 canais.

- [X] T005 [US2] Em `src/index.html`, trocar o `href` dos 3 CTAs de agendar (nav "Agendar", hero
      "Agendar sua primeira conversa", CTA final "Agendar atendimento") de `wa.me/…` para
      `https://corpora.bio/2d251bdb0e`, mantendo `target="_blank" rel="noopener"`
- [X] T006 [US2] Confirmar que a seção `.contato__canais` (e o rodapé) mantêm WhatsApp (`wa.me`),
      e-mail (`mailto:`) e Instagram como canais de contato distintos dos CTAs de agendar
      (placeholders inalterados) em `src/index.html`

## Phase 4: US3 — Foto de atmosfera full-bleed no intro (P2)

**Meta**: `section.intro` com foto full-bleed e fade espelhado (foco à esquerda, dissolve no
creme à direita), texto legível AA. **Teste independente**: 320–1440px+ mostram a foto com foco à
esquerda, fade à direita, texto legível, sem scroll horizontal.

- [X] T007 [US3] HTML — reestruturar `section.intro` em `src/index.html`: adicionar `<picture>`
      com `<img class="intro__foto">` full-bleed (`alt=""`, `width/height`, `loading="lazy"`)
      atrás do conteúdo; texto (`INTRO_P1`/`INTRO_P2` preservados) em coluna à direita
- [X] T008 [US3] CSS (`styles.css`) — `section.intro` full-bleed com `background-color` creme
      (fallback); `.intro__foto` absoluto cobrindo (z-index 0, `object-position:left center`);
      overlay `.intro::before` (z-index 1) com gradiente **espelhado**: `to left` creme→transparente
      + gradientes de borda (topo/base/esquerda) dissolvendo no creme; conteúdo z-index 2 à direita
- [X] T009 [US3] CSS responsivo do intro (`styles.css`): `<760px` overlay mais amplo/vertical +
      `object-position` adequado; `overflow:hidden` + `img` 100% → sem scroll horizontal

## Phase 5: US4 — FAQ "Aceita convênio?" atualizado (P2)

**Meta**: nova resposta no texto visível e no JSON-LD. **Teste independente**: expandir a pergunta
mostra a nova resposta; JSON-LD contém texto idêntico.

- [X] T010 [US4] Em `src/index.html`, alterar a resposta visível do FAQ "Aceita convênio?" para
      "Não, mas tenho horários específicos para atendimento social. Consulte a agenda."
- [X] T011 [US4] Em `src/index.html`, atualizar o `acceptedAnswer.text` correspondente no **JSON-LD**
      (FAQPage) com o texto idêntico ao visível

## Phase 6: QA & Polish

- [X] T012 [P] Contraste **AA** sob o texto do hero (frase reduzida) e sob o texto do intro
      (região mais escura da foto) em 320 / 768 / 1140 / 1440px
- [X] T013 [P] Sem scroll horizontal 320–1440px+; **1 `<h1>`**; 0 erros de console; CTA primário
      do hero visível sem rolar em ~1366×768 e ~390×844; foto do intro sem CLS (width/height)
- [X] T014 Build Eleventy (`npm run build`) + preview servindo `_site`; screenshots do hero
      (primeira dobra) e do bloco intro em desktop e mobile
- [ ] T015 [P] Performance (SC-006): Lighthouse/PSI **≥ 95** (mobile e desktop) — a foto do intro
      não pode degradar o LCP do hero. Preliminar local + oficial pós-deploy
- [ ] T016 Abrir PR mergeável (base=main)

## Dependencies & Execution Order

- Phase 1 (Setup) → US1 → US2 → US3 → US4 → QA.
- T002 (asset) precede T007/T008 (markup/CSS do intro dependem da imagem e dimensões).
- T003 (CSS hero) precede T004 (espelho no crítico).
- T007 (HTML intro) precede T008/T009 (CSS depende das classes).
- T010 e T011 devem usar **texto idêntico** (visível == JSON-LD).
- US1, US2, US4 são independentes entre si; US3 depende do asset (T002).

## Parallel Opportunities

- T002 (asset) pode rodar em paralelo à US1 (T003/T004) — arquivos diferentes.
- T012, T013 e T015 (checagens de QA) são independentes entre si.

## Implementation Strategy

- **MVP = US1 + US2** (CTA acima da dobra apontando para o link oficial) — maior impacto de
  conversão. US3 (foto) e US4 (FAQ) agregam sem bloquear o MVP.
- Tocar preferencialmente `styles.css`; `src/index.html` para markup do intro, CTAs, FAQ e o
  espelho no CSS crítico. Nenhuma outra seção/arquivo é alterada (FR-010).

## Notes

- Sem tasks de teste automatizado (validação por checagens + build + preview), conforme a spec.
- Verificação-chave (não-negociável): **AA sob o texto** do hero e do intro, independente do
  conteúdo das fotos.
