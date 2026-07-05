---
description: "Task list — Hero imersivo (foto full-bleed com fade)"
---

# Tasks: Hero imersivo (foto full-bleed com fade)

**Input**: `specs/004-hero-imersivo/` (spec.md, plan.md) · Legenda: `[ ]` pendente · `[X]` feita ·
`[P]` paralelizável (arquivos diferentes, sem dependência)

**Escopo**: apenas a seção `.hero` da home (`src/index.html`) e o CSS (`src/assets/css/styles.css`
+ bloco crítico inline). Sem JS novo. Commit por fase; PR mergeável ao final.

## Phase 1: Setup
- [ ] T001 Verificar baseline antes de mexer: hero atual em 2 colunas, foto
      `src/assets/images/giovanna-hero.jpg`/`.webp` presente, 1 `<h1>`, sem scroll horizontal

## Phase 2: US1 — Primeira dobra imersiva (P1) 🎯 MVP

**Meta**: foto full-bleed atrás do texto, com fade que garante AA à esquerda e dissolve as bordas
no creme. **Teste independente**: desktop mostra a foto cobrindo o hero, fade suave, texto legível.

- [ ] T002 [US1] HTML — reestruturar a seção `.hero` em `src/index.html`: foto como `<img>`
      full-bleed (posição absoluta, `object-fit:cover`, `fetchpriority="high"`, `width/height`,
      `alt=""` decorativo) atrás do conteúdo; texto do hero em coluna à esquerda; **preservar**
      os marcadores editáveis (FRASE_HERO, HERO_APOIO, CTAs) e o `<h1>` único
- [ ] T003 [US1] CSS (`styles.css`, seção 7 HERO) — `.hero` full-bleed com `background-color`
      creme (fallback); `.hero__foto` absoluto cobrindo (z-index 0); **camada de overlay/gradiente**
      (z-index 1): gradiente horizontal creme→transparente (AA sob o texto) + gradientes de borda
      dissolvendo a foto no creme (sem corte duro); conteúdo em z-index 2, coluna à esquerda com
      `max-width` de leitura
- [ ] T004 [US1] Espelhar as novas regras do hero no **bloco de CSS crítico inline** de
      `src/index.html` (above-the-fold), evitando flash do layout antigo

## Phase 3: US2 — Legibilidade responsiva (P2)

**Meta**: efeito adapta de 320px a 1440px+ sem quebrar legibilidade nem gerar scroll horizontal.

- [ ] T005 [US2] CSS responsivo do hero (`styles.css` + crítico): desktop (texto ~50–55% à
      esquerda, foto visível à direita pela parte transparente); mobile (<760px) overlay mais
      amplo/vertical + `object-position` para o texto seguir AA sobre a foto; `overflow:hidden` +
      `img` 100% → sem scroll horizontal

## Phase 4: US3 — Degradação graciosa e movimento respeitoso (P3)

- [ ] T006 [US3] Garantir **fallback de cor** (creme) no hero se a imagem falhar; confirmar
      conformidade com `prefers-reduced-motion` (nenhuma animação nova) e `alt=""` decorativo
      (toda a informação está no texto)

## Phase 5: QA
- [ ] T007 [P] Contraste **AA** sob TODO o texto do hero (medir a região mais escura da foto sob
      o texto) em 320 / 768 / 1140 / 1440px
- [ ] T008 [P] Sem scroll horizontal 320–1440px+; **1 `<h1>`**; 0 erros de console; a foto carrega
      como `<img>` (provável LCP) com `fetchpriority="high"`; sem CLS (width/height)
- [ ] T009 Build Eleventy + preview servindo `_site`; screenshots do hero em desktop e mobile
- [ ] T010 [P] Performance (SC-003): confirmar Lighthouse/PSI **≥ 95** (mobile e desktop) — a
      foto full-bleed não pode degradar o LCP; medir/registrar (reusar o processo de
      `specs/001-site-institucional-blog/lighthouse.md`). Preliminar local + oficial pós-deploy
- [ ] T011 Abrir PR mergeável (base=main)

## Dependencies & Execution Order
- Phase 1 → US1 (T002 → T003 → T004) → US2 (T005) → US3 (T006) → QA.
- T002 (HTML/estrutura) precede T003 (CSS depende das classes); T004 espelha T003.
- T007 e T008 são checagens independentes (paralelas) na fase de QA.

## Implementation Strategy
- **MVP = US1** (hero imersivo no desktop). US2 garante o mobile; US3 a robustez.
- Tocar preferencialmente `styles.css`; `src/index.html` só para o markup do hero e o espelho no
  CSS crítico. Nenhuma outra seção/arquivo é alterado (FR-010).

## Notes
- Sem tasks de teste automatizado (validação por checagens + build + preview), conforme a spec.
- Verificação-chave (não-negociável): **AA sob o texto** independente do conteúdo da foto.
