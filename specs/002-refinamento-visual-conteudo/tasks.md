---
description: "Task list — Refinamento visual e de conteúdo"
---

# Tasks: Refinamento visual e de conteúdo

**Input**: `specs/002-refinamento-visual-conteudo/` · Legenda: `[ ]` pendente · `[X]` feita

## Phase 1: Setup
- [ ] T001 Verificar baseline (sem scroll horizontal, AA, 1 `<h1>`/página) antes de mexer

## Phase 2: Foundational (CSS/JS base do refino)
- [ ] T002 CSS: utilitário `.reveal` (estado padrão **visível**; variação animada) +
      bloco `prefers-reduced-motion` desligando tudo
- [ ] T003 JS (`main.js`): IntersectionObserver que adiciona `.is-visible` aos `.reveal`
      (no-op se reduced-motion; conteúdo visível sem JS)

## Phase 3: US1 — Estética editorial (P1) 🎯
- [ ] T004 [US1] Acentos decorativos SVG (traço/folha) em selos/títulos de seção
- [ ] T005 [US1] Divisores sutis entre seções (sem overflow no mobile)
- [ ] T006 [US1] Hero: forma/halo suave de fundo atrás da imagem
- [ ] T007 [US1] Hover/foco refinados em `.card`, `.area`, `.post-card`, `.btn`

## Phase 4: US2 — Movimento sutil (P2)
- [ ] T008 [US2] Aplicar `.reveal` às seções/cards da home (e listagem do blog)
- [ ] T009 [US2] Verificar: reduced-motion = sem animação; sem JS = tudo visível

## Phase 5: US3 — Ilustrações-placeholder (P3)
- [ ] T010 [US3] Ilustração SVG "hero" (janela/luz/planta) substituindo o bloco chapado
- [ ] T011 [US3] Ilustração SVG "sobre" (xícara/caderno/planta)
- [ ] T012 [US3] Garantir `<picture>`/nomes intactos para troca pelas fotos reais + `alt`

## Phase 6: US4 — Microcopy (P3)
- [ ] T013 [US4] Revisão leve de subtítulos/CTAs/apoios preservando marcadores editáveis

## Phase 7: QA
- [ ] T014 Responsivo 320–1440px+ sem scroll horizontal
- [ ] T015 Teclado/foco visível; decorações `aria-hidden`
- [ ] T016 Contraste AA; 1 `<h1>`/página; 0 erros de console; JSON-LD intacto
- [ ] T017 Atualizar checklist e abrir PR (base=main)

## Notes
- Tocar preferencialmente `styles.css`/`main.js`; HTML só para hooks/ilustrações/copy.
- Commit por fase; PR mergeável ao final.
