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

## Phase 5: US3 — Placeholders ilustrados (P3) 🎯 ✅
> **Abordagem (Opção B, aprovada):** manter o `<picture>` intacto e referenciar um
> arquivo `.svg` no `<img>`/`<source>`; a troca pela foto real continua trivial
> (editar o bloco `<picture>` — documentado no README de imagens). `viewBox` nas
> proporções do layout para não causar layout shift (constituição IV).
- [X] T010 [US3] Placeholder ilustrado SVG "hero" (janela/luz/planta), proporção 4:5
      (`viewBox 640×800`), substituindo o bloco chapado
- [X] T011 [US3] Placeholder ilustrado SVG "sobre" (xícara/caderno/planta), proporção 3:4
      (`viewBox 480×640`)
- [X] T012 [US3] Manter `<picture>` e `alt` significativos; SVG decorativo `aria-hidden`;
      atualizar `assets/images/README.md` com a instrução de troca (Opção B)
      (verificado via preview: SVGs 200/`image/svg+xml`, 640×800 e 480×640, sem 404,
      sem scroll horizontal, 0 erros de console; rasters de hero/sobre removidos)

## Phase 6: US4 — Microcopy (P3) 🎯 ✅
> **Escopo (aprovado pela análise):** ajustar apenas selos/subtítulos de seção, rótulos
> de CTA e frases de apoio (`.apoio`). **Fora do escopo:** `<h1>` do hero, dados de
> contato/CRP e meta/SEO (title/description/OG/Twitter/JSON-LD intocados). Guardrails:
> preservar todos os marcadores editáveis; respeitar a restrição ética (sem promessa de
> cura/diagnóstico); manter AA, 1 `<h1>`, 0 erros de console, sem scroll horizontal.
- [X] T013 [US4] Revisão leve de subtítulos/CTAs/apoios preservando marcadores editáveis
      (4 ajustes na home: CTA "Sobre" → "Falar comigo"; h2 Áreas; h2 FAQ; apoio Contato.
      Verificado via preview: marcadores 16/16 idênticos, 1 `<h1>`, 0 erros, sem scroll
      horizontal, SEO/`title` intocados)

## Phase 7: QA
- [X] T014 Responsivo: sem scroll horizontal a 320px e desktop (verificado via preview)
- [~] T015 Decorações são CSS puro (`::before`/`::after`, não focáveis); foco visível mantido
- [X] T016 1 `<h1>`/página, 0 erros de console; JSON-LD intacto (US1 não tocou HTML)
- [ ] T017 Abrir PR mergeável (base=main) — US1

## Notes
- Tocar preferencialmente `styles.css`/`main.js`; HTML só para hooks/ilustrações/copy.
- Commit por fase; PR mergeável ao final.
