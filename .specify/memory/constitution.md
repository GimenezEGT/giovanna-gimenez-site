# Giovanna Gimenez · Psicanálise Clínica — Constitution

Princípios invioláveis do site institucional + blog ("Reflexões") da psicanalista
Giovanna Gimenez (atendimento online). Este documento é a fonte de verdade do projeto;
o detalhamento original está em [specs/constitution.md](../../specs/constitution.md).

## Core Principles

### I. Estático primeiro, build mínimo aprovado (NON-NEGOTIABLE)
O site entregue é 100% estático e roda em GitHub Pages sem backend. **Emenda (v1.1.0,
2026-07-02):** é permitido **um** passo de build **leve** — o gerador **Eleventy** monta as
páginas do blog (Markdown → HTML) no CI (GitHub Actions), publicando `_site/`. O output
continua estático, sem runtime de servidor. Qualquer OUTRA ferramenta de build ainda exige
aprovação explícita. Caminhos de assets preferencialmente relativos.

### II. Stack vanilla, sem frameworks (NON-NEGOTIABLE)
HTML5 semântico + CSS moderno (custom properties, Flexbox, Grid) + JavaScript vanilla
mínimo. Proibidos React, Vue, Svelte, jQuery e bibliotecas de runtime pesadas. Ícones são
SVG inline; sem fontes de ícones. O site deve funcionar mesmo sem JavaScript e mesmo se o
Google Fonts falhar (fallbacks de sistema).

### III. Acessibilidade WCAG 2.1 AA (NON-NEGOTIABLE)
Contraste AA em todo texto; navegação completa por teclado com foco visível; `alt`
significativo; landmarks/ARIA corretos; `prefers-reduced-motion` respeitado. Nenhuma
entrega é considerada pronta se quebrar a acessibilidade.

### IV. Performance e SEO de primeira classe
Meta Lighthouse ≥ 95 em Performance, Acessibilidade, Práticas Recomendadas e SEO. Imagens
otimizadas (WebP com fallback), lazy-load, dimensões explícitas, `font-display: swap`.
SEO: title/description/canonical únicos por página, Open Graph/Twitter, JSON-LD válido,
`sitemap.xml`, `robots.txt`, um único `<h1>` por página, `lang="pt-BR"`.

### V. Conteúdo editável por leigos
Toda copy editável é delimitada por comentários marcados (ex.: `<!-- FRASE_HERO:início -->`)
com valor padrão. Estruturas repetíveis (formação, áreas, posts) são fáceis de
adicionar/remover/reordenar. Dados sensíveis (telefone, e-mail, Instagram, CRP, URL) são
placeholders claramente identificados, com instruções de troca no README.

## Identidade Visual (restrição fixa)

Paleta oficial (brand board): creme `#F6F3EF`, bege `#E7DFCF`, oliva `#6B6F4E`,
sálvia `#A7AD8A`, marrom `#3A352F`, cinza `#D9D6CF`. Logo oficial: monograma "g" com
raminho + wordmark (assets em `assets/logo/`); tagline "escuta que acolhe, presença que
transforma.". Tipografia: Playfair Display
(títulos) + Lato (corpo), escala fluida com `clamp()`. Estética de atmosfera (luz natural,
tons terrosos, plantas, madeira, cerâmica), nunca corporativa. Tom: acolhimento,
serenidade, profissionalismo. Restrição ética de conteúdo: não prometer cura, não dar
diagnóstico, não substituir acompanhamento.

## Fluxo de Desenvolvimento (Spec-Driven Development)

O projeto usa Spec Kit. Ordem: `/speckit-constitution` → `/speckit-specify` →
(`/speckit-clarify`) → `/speckit-plan` → `/speckit-tasks` → (`/speckit-analyze`) →
`/speckit-implement`. Nenhuma implementação começa antes da aprovação das specs. Um commit
claro por tarefa concluída. Definition of Done: atende à spec, responsivo (320–1440px+),
acessível por teclado, contraste AA, sem erro de console, e commitado.

## Governance

Esta constituição prevalece sobre outras práticas. Alterações exigem registro neste
arquivo e atualização da versão. Toda entrega deve verificar conformidade com os princípios
I–V. Complexidade adicional precisa ser justificada (preferência por simplicidade/YAGNI).

**Version**: 1.1.0 | **Ratified**: 2026-06-30 | **Last Amended**: 2026-07-02
(v1.1.0: build leve com Eleventy permitido — feature 003 CMS do blog.)
