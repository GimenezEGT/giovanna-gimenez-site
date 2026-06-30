# Implementation Plan: Refinamento visual e de conteúdo

**Branch**: `002-refinamento-visual-conteudo` | **Date**: 2026-06-30 | **Spec**: [spec.md](./spec.md)

## Summary

Refino de acabamento sobre o site existente: acentos decorativos SVG, divisores e
profundidade sutis, hover/foco refinados, microanimação de revelação ao rolar
(IntersectionObserver, reduced-motion-safe) e ilustrações SVG no lugar dos placeholders de
imagem. Sem novas dependências; mudanças concentradas em `assets/css/styles.css`,
`assets/js/main.js` e nos arquivos de imagem-placeholder. Estrutura, paleta e tipografia
permanecem inalteradas (constituição).

## Technical Context

**Language/Version**: CSS3, JS vanilla (ES6). **Primary Dependencies**: nenhuma nova.
**Project Type**: site estático. **Performance Goals**: preservar Lighthouse ≥95; JS extra
mínimo (um observer). **Constraints**: zero build; AA; `prefers-reduced-motion`; funciona
sem JS; sem scroll horizontal 320–1440px+.

## Constitution Check

- I. Estático/zero build: ✅  · II. Vanilla/sem libs: ✅ (observer vanilla; SVG inline)
- III. Acessibilidade AA: ✅ (foco visível, decorações `aria-hidden`, sem perda de contraste)
- IV. Performance/SEO: ✅ (CSS/JS enxutos; sem mídia pesada — SVG inline)
- V. Conteúdo editável: ✅ (marcadores preservados)

Sem violações. Sem Complexity Tracking.

## Project Structure

### Documentation
```text
specs/002-refinamento-visual-conteudo/
├── plan.md  ├── spec.md  ├── tasks.md
└── checklists/requirements.md
```

### Source (arquivos tocados)
```text
assets/css/styles.css          # acentos, divisores, hover/foco, classes de reveal
assets/js/main.js              # IntersectionObserver de revelação (progressivo)
index.html                     # hooks de reveal/acento + ilustrações-placeholder
reflexoes/index.html, posts/*  # reveal opcional + consistência
assets/images/*.svg (novos)    # ilustrações-placeholder (ou inline no HTML)
```

**Structure Decision**: manter um CSS/JS únicos; ilustrações como SVG (inline no HTML ou
arquivos `.svg`), preservando o `<picture>` para troca pelas fotos reais. Animação por
classe utilitária `.reveal` com estado padrão **visível** (JS apenas adiciona o efeito).
