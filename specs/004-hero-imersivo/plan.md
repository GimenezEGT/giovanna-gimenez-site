# Implementation Plan: Hero imersivo (foto full-bleed com fade)

**Branch**: `feat/004-hero-imersivo` | **Date**: 2026-07-04 | **Spec**: [spec.md](./spec.md)

## Summary

Transformar a primeira dobra (`.hero`) de um layout de **duas colunas (texto | imagem)** para
um **hero full-bleed**: a foto de atmosfera já existente (`giovanna-hero.jpg/.webp`) cobre todo
o bloco atrás do texto, com **camadas de gradiente** que (a) garantem contraste **AA** do texto
à esquerda e (b) **dissolvem** as bordas da foto no fundo creme. Mudança é **CSS + HTML da
seção hero** (e o espelho no CSS crítico inline), sem JS novo e sem outras seções.

## Technical Context

**Linguagem/stack**: HTML5 semântico + CSS moderno (custom properties, Grid/Flex, gradientes).
Sem JavaScript novo (efeito 100% CSS). Sem frameworks.

**Fonte/estrutura**: `src/index.html` (home manual, gerada pelo Eleventy) + `src/assets/css/styles.css`
+ **bloco de CSS crítico inline** no `<head>` de `src/index.html` (subconjunto above-the-fold do hero
que precisa espelhar as regras). Blog usa `src/_includes/base.njk` — **não** renderiza `.hero`, então
não é tocado (as regras `.hero` no crítico do base.njk ficam inertes).

**Plataforma-alvo**: navegadores modernos (desktop + mobile), GitHub Pages estático.

**Project Type**: site estático de página única + blog (feature toca só a home).

**Performance Goals**: Lighthouse/PSI **≥ 95** (mobile e desktop); a foto é o provável **LCP** →
mantida como `<img>` otimizada com `fetchpriority="high"` e dimensões explícitas (sem CLS).

**Constraints**: **WCAG 2.1 AA** sob todo o texto (não-negociável); **sem scroll horizontal**
320–1440px+; `prefers-reduced-motion` respeitado; 1 `<h1>`; reuso da imagem atual (sem novo peso).

**Scale/Scope**: uma seção (hero) da home.

## Constitution Check

*GATE: aprovado antes do design e re-checado após.*

| Princípio | Status | Nota |
|-----------|:------:|------|
| I. Estático, zero/menor build | ✅ | Só CSS/HTML; nenhum build novo. |
| II. Vanilla, sem frameworks | ✅ | Efeito 100% CSS (gradientes); nenhum JS/lib. |
| III. Acessibilidade AA (NON-NEG.) | ✅ | Overlay garante base clara sob o texto → AA independente do conteúdo da foto; foco visível dos CTAs mantido. |
| IV. Performance/SEO ≥95 | ✅ | Foto segue `<img>` otimizada (webp+fallback, `fetchpriority`, `width/height`); LCP preservado; nada de novo peso. |
| V. Editável por leigos | ✅ | Preserva os marcadores editáveis do texto do hero (FRASE_HERO, HERO_APOIO, CTAs). |
| Identidade visual (fixa) | ✅ | Paleta/tipografia inalteradas; usa creme/oliva oficiais. |

**Resultado**: sem violações → sem Complexity Tracking.

## Abordagem técnica (decisões / "research")

1. **Foto como `<img>` full-bleed (não `background-image`)** — *Decisão*: manter a foto num
   `<img>` posicionado absoluto cobrindo o hero (`inset:0; width/height:100%; object-fit:cover;
   z-index:0`), com `fetchpriority="high"` e `width/height`. *Rationale*: preserva o LCP
   (background-image não é priorizado nem facilmente pré-carregado) e evita CLS. *Alternativa
   rejeitada*: `background-image` (pior LCP, mais difícil de otimizar).

2. **A11y da imagem** — *Decisão*: como a foto passa a ser **pano de fundo atmosférico** (todo o
   significado está no texto), usar `alt=""` (decorativa) para não gerar ruído em leitores de
   tela. *Rationale*: FR-004/FR-009 põem a informação no texto; a imagem é decorativa.

3. **Fade/legibilidade com camadas de gradiente** — *Decisão*: uma camada de overlay sobre a
   foto (`z-index:1`) combinando:
   - **gradiente horizontal** da esquerda (creme quase opaco, p.ex. `rgba(246,243,239,0.92)`) →
     transparente ~55–65% da largura, garantindo AA sob o texto;
   - **gradientes de borda** (topo/base/direita) fazendo a foto **dissolver** no creme (sem
     corte duro).
   *Rationale*: a legibilidade não depende do conteúdo da foto (FR-004); as bordas somem
   suavemente (FR-002/SC-004). *Alternativa rejeitada*: escurecer a foto e usar texto claro —
   mudaria o tom sereno/claro da marca.

4. **Layout** — *Decisão*: `.hero` full-bleed (já é seção full-width com `position:relative;
   overflow:hidden`); conteúdo em `.container` com coluna de texto à esquerda (`max-width` de
   leitura, alinhado à esquerda), `z-index:2` acima do overlay. Remover o `grid` de 2 colunas.
   `min-height` do hero via `clamp()` para a foto ter presença sem empurrar demais.

5. **Responsivo** — *Decisão*: 
   - **≥ ~760px**: texto ocupa ~50–55% à esquerda; foto visível à direita através da parte
     transparente do gradiente.
   - **< 760px (mobile)**: overlay cobre mais (fade vertical mais amplo) para o texto seguir
     AA sobre a foto; `object-position` mantém uma parte agradável da foto ao redor do texto.

   - `overflow:hidden` + `img` a 100% → **sem scroll horizontal**.

6. **Fallback & reduced-motion** — *Decisão*: `background-color: var(--cor-creme)` no hero (se a
   imagem falhar, texto sobre creme = AA — FR-009). Nenhuma animação/parallax adicionada; o bloco
   `prefers-reduced-motion` existente permanece válido (FR-007).

7. **CSS crítico** — *Decisão*: as regras do hero estão no **bloco crítico inline** de
   `src/index.html` (above-the-fold) → **atualizar lá também** para não haver flash de layout
   antigo. `styles.css` é a fonte da verdade.

## Project Structure

### Documentação (esta feature)
```text
specs/004-hero-imersivo/
├── spec.md          # concluído
├── plan.md          # este arquivo
├── checklists/requirements.md
└── tasks.md         # próximo (/speckit-tasks)
```
> `research.md`, `data-model.md`, `contracts/`, `quickstart.md`: **N/A** — feature CSS/HTML sem
> dados nem interfaces externas; decisões consolidadas na seção "Abordagem técnica" acima
> (mesma convenção enxuta das features 002/003).

### Código (arquivos tocados)
```text
src/index.html                     # seção .hero (markup) + bloco de CSS crítico inline (hero)
src/assets/css/styles.css          # regras da seção 7 (HERO) + responsivo do hero
```
**Structure Decision**: escopo cirúrgico — apenas a seção hero da home e suas regras CSS
(styles.css + crítico). Nenhuma outra seção/arquivo é alterado (FR-010).

## Complexity Tracking

Sem violações de constituição → nada a justificar.
