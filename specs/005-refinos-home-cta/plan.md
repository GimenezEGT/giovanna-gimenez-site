# Implementation Plan: Refinos da home — hero above-the-fold, foto no intro, FAQ e link

**Branch**: `feat/005-refinos-home-cta` | **Date**: 2026-07-07 | **Spec**: [spec.md](./spec.md)

## Summary

Quatro ajustes cirúrgicos na home, sem tocar em outras páginas: (1) **reduzir a frase do hero**
para o CTA caber na primeira dobra; (2) apontar **todos os CTAs de agendar** para o link oficial
`https://corpora.bio/2d251bdb0e` e manter a **área de contato** (WhatsApp/e-mail/Instagram) com
placeholders; (3) dar ao bloco introdutório "Existem momentos…" uma **foto full-bleed com fade
espelhado** (foco à esquerda, dissolve no creme à direita), reusando a técnica do hero (feature
004); (4) trocar a resposta do FAQ "Aceita convênio?" no **texto visível e no JSON-LD**. Tudo em
`src/index.html` + `styles.css` (+ bloco crítico inline), mais a adição do asset de imagem
otimizado.

## Technical Context

**Linguagem/stack**: HTML5 semântico + CSS moderno (custom properties, gradientes, Grid/Flex).
Sem JavaScript novo. Sem frameworks.

**Fonte/estrutura**: `src/index.html` (home, Eleventy) + `src/assets/css/styles.css` + **bloco de
CSS crítico inline** no `<head>` de `src/index.html`. Novo asset: `src/assets/images/` recebe a
foto do intro (WebP + fallback JPG, dimensões explícitas). Blog (`base.njk`) **não** é tocado.

**Plataforma-alvo**: navegadores modernos (desktop + mobile), GitHub Pages estático.

**Project Type**: site estático de página única + blog (feature toca só a home).

**Performance Goals**: Lighthouse/PSI **≥ 95** (mobile e desktop). O hero permanece o LCP; a foto
do intro entra otimizada (WebP + fallback, `width/height`, `loading="lazy"` por estar abaixo da
dobra) para **não** competir com o LCP nem gerar CLS.

**Constraints**: **WCAG 2.1 AA** sob todo o texto (não-negociável); **sem scroll horizontal**
320–1440px+; `prefers-reduced-motion` respeitado; **1 `<h1>`**; reuso das técnicas existentes.

**Scale/Scope**: uma página (home): hero, bloco intro, FAQ (+ JSON-LD), nav/CTAs de agendar,
seção de contato.

## Constitution Check

*GATE: aprovado antes do design e re-checado após.*

| Princípio | Status | Nota |
|-----------|:------:|------|
| I. Estático, build leve | ✅ | Só CSS/HTML + 1 asset de imagem; nenhum build novo além do Eleventy já aprovado. |
| II. Vanilla, sem frameworks | ✅ | Fade 100% CSS (gradientes); nenhum JS novo. |
| III. Acessibilidade AA (NON-NEG.) | ✅ | Overlay garante base clara sob o texto do intro → AA independente da foto; foto decorativa `alt=""`; foco visível dos CTAs mantido; frase do hero segue AA. |
| IV. Performance/SEO ≥95 | ✅ | Foto do intro otimizada (WebP+fallback, `width/height`, `lazy`); LCP do hero preservado; JSON-LD do FAQ mantido consistente com o texto visível. |
| V. Editável por leigos | ✅ | Preserva marcadores editáveis (FRASE_HERO, INTRO_P1/P2, CTAs); link de agendamento e contatos seguem como placeholders identificáveis. |
| Identidade visual (fixa) | ✅ | Paleta/tipografia inalteradas; fade usa o creme oficial; estética de atmosfera reforçada. |

**Resultado**: sem violações → sem Complexity Tracking.

## Abordagem técnica (decisões / "research")

1. **Reduzir a frase do hero (US1)** — *Decisão*: diminuir a escala tipográfica de `.hero__frase`
   (reduzir o `clamp()` atual e, se necessário, o `margin`/`line-height`) tanto em `styles.css`
   quanto no **bloco crítico inline** (evita flash). *Rationale*: a frase é o elemento mais alto
   acima dos CTAs; encolhê-la sobe os botões para a primeira dobra sem mexer no `min-height` do
   hero. *Alternativa rejeitada*: reduzir `min-height` do hero (afetaria a presença da foto e o
   enquadramento definido na 004).

2. **Link oficial de agendamento (US2)** — *Decisão*: substituir os `href` dos **três** CTAs de
   agendar (nav "Agendar", hero "Agendar sua primeira conversa", CTA final "Agendar atendimento")
   de `wa.me/…` para `https://corpora.bio/2d251bdb0e`, mantendo `target="_blank" rel="noopener"`.
   Os canais da **seção de contato** (`.contato__canais`) e do rodapé permanecem inalterados
   (WhatsApp de contato segue `wa.me`, e-mail `mailto:`, Instagram) — são canais de contato, não
   de agendamento. *Rationale*: separa claramente "agendar" (link oficial) de "falar direto"
   (contato). Atende FR-002/FR-003.

3. **Foto full-bleed com fade espelhado no intro (US3)** — *Decisão*: transformar a
   `section.intro` numa seção full-bleed análoga ao hero:
   - `<picture>` com `<img class="intro__foto">` absoluto cobrindo (`inset:0; object-fit:cover;
     z-index:0`), `alt=""`, `width/height` explícitos, `loading="lazy"` (abaixo da dobra);
   - **camada de overlay** (`.intro::before`, z-index:1) com gradiente **espelhado** ao do hero:
     `linear-gradient(to left, creme ~0,92 → transparente ~55–65%)` (creme opaco à **direita**,
     transparente à **esquerda**) + gradientes de borda (topo/base/**esquerda**) dissolvendo a
     foto no creme; foco visual da foto à esquerda via `object-position: left center`;
   - conteúdo do intro em coluna à **direita** (`z-index:2`, `max-width` de leitura, alinhado à
     direita), preservando os marcadores `INTRO_P1`/`INTRO_P2`.
   *Rationale*: mesma técnica validada na 004, apenas espelhada — foco à esquerda, texto legível
   sobre a área creme à direita (FR-004/FR-005). *Alternativa rejeitada*: `background-image`
   (pior controle de otimização/dimensão).

4. **Responsivo do intro** — *Decisão*: `< ~760px`, o overlay cobre mais (fade vertical amplo) e
   o texto volta a ocupar a largura com base clara suficiente para AA; `object-position` mantém
   uma parte agradável da foto; `overflow:hidden` + `img` 100% → sem scroll horizontal.

5. **Fallback & reduced-motion** — *Decisão*: `background-color: var(--cor-creme)` na
   `section.intro` (se a foto falhar, texto sobre creme = AA — FR-008). Nenhuma animação nova; o
   bloco `prefers-reduced-motion` existente permanece válido.

6. **FAQ "Aceita convênio?" (US4)** — *Decisão*: editar **dois** pontos em `src/index.html`: o
   `<div class="faq__corpo">` visível e o `acceptedAnswer.text` no **JSON-LD** (FAQPage), com o
   texto idêntico "Não, mas tenho horários específicos para atendimento social. Consulte a
   agenda." *Rationale*: consistência SEO/tela (FR-006/SC-005).

7. **Otimização do asset** — *Decisão*: adicionar `capa_gigi_2.png` como `intro-atmosfera.webp`
   (+ fallback `.jpg`) em `src/assets/images/`, redimensionada para largura coerente com o bloco
   (ex.: ~1600px de largura) e comprimida; `width/height` no `<img>` para evitar CLS. *Rationale*:
   FR-009/SC-006 (performance ≥95, sem CLS). *Ferramenta*: conversão local (o repo já usa
   WebP+JPG para hero/sobre).

8. **CSS crítico** — *Decisão*: as regras above-the-fold afetadas (hero: frase reduzida) entram
   também no **bloco crítico inline** de `src/index.html`. As regras do intro (abaixo da dobra)
   podem ficar só em `styles.css`. *Rationale*: evita flash apenas onde importa (hero).

## Project Structure

### Documentação (esta feature)
```text
specs/005-refinos-home-cta/
├── spec.md          # concluído
├── plan.md          # este arquivo
├── checklists/requirements.md
└── tasks.md         # próximo (/speckit-tasks)
```
> `research.md`, `data-model.md`, `contracts/`, `quickstart.md`: **N/A** — feature CSS/HTML +
> conteúdo, sem dados nem interfaces externas; decisões consolidadas em "Abordagem técnica"
> (mesma convenção enxuta das features 002/003/004).

### Código (arquivos tocados)
```text
src/index.html                     # frase hero (crítico+markup), CTAs de agendar, seção intro
                                   #   (markup da foto), FAQ (visível + JSON-LD)
src/assets/css/styles.css          # frase hero menor; seção do intro full-bleed + fade espelhado
src/assets/images/intro-atmosfera.webp / .jpg   # novo asset otimizado (capa_gigi_2.png)
```
**Structure Decision**: escopo cirúrgico — apenas a home e suas regras CSS + 1 asset. Nenhuma
outra página/seção é alterada (FR-010).

## Complexity Tracking

Sem violações de constituição → nada a justificar.
