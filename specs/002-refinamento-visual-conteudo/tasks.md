---
description: "Task list — Refinamento visual e de conteúdo"
---

# Tasks: Refinamento visual e de conteúdo

**Input**: `specs/002-refinamento-visual-conteudo/` · Legenda: `[ ]` pendente · `[X]` feita

> **Escopo aprovado até agora: US1 (estética estática, entregue) + US2 (movimento sutil,
> esta rodada).** US3 (ilustrações) e US4 (microcopy) ficam pendentes para uma próxima rodada.

## Phase 1: Setup
- [X] T001 Verificar baseline (sem scroll horizontal, AA, 1 `<h1>`/página) antes de mexer

## Phase 2: Foundational (CSS/JS base do refino) — US2
- [X] T002 CSS: utilitário `.reveal` (estado padrão **visível**; variação animada) +
      bloco `prefers-reduced-motion` desligando tudo
- [X] T003 JS (`main.js`): IntersectionObserver que adiciona `.is-visible` aos `.reveal`
      (no-op se reduced-motion; conteúdo visível sem JS)

## Phase 3: US1 — Estética editorial (P1) 🎯 ✅
- [X] T004 [US1] Acentos decorativos em selos (`.selo::before`) e títulos de seção
- [X] T005 [US1] Traço/divisor sutil sob títulos centralizados (`.centro h2::after`)
- [X] T006 [US1] Hero: halo suave atrás da imagem (`.hero::before`, contido, sem overflow)
- [X] T007 [US1] Hover/foco refinados em `.card`, `.area` e botões (sombra/elevação sutil)

## Phase 4: US2 — Movimento sutil (P2) 🎯 ✅
- [X] T008 [US2] Aplicar `.reveal` às seções/cards da home (e listagem do blog)
- [X] T009 [US2] Verificar: reduced-motion = sem animação; sem JS = tudo visível
      (verificado via preview: sem `.js-reveal` todos os 14 `.reveal` têm opacity:1;
      com JS, 14/14 revelam ao rolar; 0 erros de console)

## Phase 5: US3 — Ilustrações-placeholder (P3) — PENDENTE
- [ ] T010 [US3] Ilustração SVG "hero" (janela/luz/planta) substituindo o bloco chapado
- [ ] T011 [US3] Ilustração SVG "sobre" (xícara/caderno/planta)
- [ ] T012 [US3] Garantir `<picture>`/nomes intactos para troca pelas fotos reais + `alt`

## Phase 6: US4 — Microcopy (P3) — PENDENTE
- [ ] T013 [US4] Revisão leve de subtítulos/CTAs/apoios preservando marcadores editáveis

## Phase 7: QA
- [X] T014 Responsivo: sem scroll horizontal a 320px e desktop (verificado via preview)
- [~] T015 Decorações são CSS puro (`::before`/`::after`, não focáveis); foco visível mantido
- [X] T016 1 `<h1>`/página, 0 erros de console; JSON-LD intacto (US1 não tocou HTML)
- [ ] T017 Abrir PR mergeável (base=main) — US1

## Notes
- Tocar preferencialmente `styles.css`/`main.js`; HTML só para hooks/ilustrações/copy.
- Commit por fase; PR mergeável ao final.
