# Implementation Plan: Site institucional + blog "Reflexões"

**Branch**: `001-site-institucional-blog` | **Date**: 2026-06-30 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-site-institucional-blog/spec.md`

## Summary

Site estático (página única com âncoras + blog) para a psicanalista Giovanna Gimenez,
hospedado no GitHub Pages. Abordagem: HTML semântico + um CSS (custom properties/Grid/Flex)
+ JS vanilla mínimo, **sem build**, com foco em acolhimento visual, acessibilidade AA,
performance e SEO. Já implementado; este plano formaliza a arquitetura e enquadra o
fechamento de pendências. Detalhe técnico completo em [../plan.md](../plan.md).

## Technical Context

**Language/Version**: HTML5, CSS3 (custom properties, Grid, Flexbox), JavaScript ES5/ES6
vanilla.

**Primary Dependencies**: Nenhuma de runtime. Google Fonts (Playfair Display + Lato) com
fallback de sistema. Sem frameworks, sem gerenciador de pacotes.

**Storage**: N/A (conteúdo em arquivos HTML estáticos).

**Testing**: Verificação manual + checagens por script (JSON-LD válido, links internos,
contagem de `<h1>`, sincronismo FAQ↔JSON-LD) e auditoria Lighthouse pós-deploy.

**Target Platform**: Navegadores modernos (desktop e mobile), GitHub Pages.

**Project Type**: Site estático (single project, sem backend).

**Performance Goals**: Lighthouse ≥ 95 nas 4 categorias; sem render-blocking desnecessário;
imagens otimizadas; CLS mínimo (dimensões explícitas).

**Constraints**: Zero build; caminhos relativos; responsivo 320–1440px+ sem scroll
horizontal; WCAG 2.1 AA; `prefers-reduced-motion`; funciona sem JS.

**Scale/Scope**: 1 home + 1 listagem + 3 posts (+ 404, template). Conteúdo de baixo volume,
manutenção manual.

## Constitution Check

*GATE: revisado contra [.specify/memory/constitution.md](../../.specify/memory/constitution.md).*

- **I. Estático/zero build**: ✅ sem backend/build; deploy via GitHub Actions (Pages);
  caminhos relativos.
- **II. Stack vanilla**: ✅ sem frameworks; ícones SVG inline; funciona sem JS e sem fontes externas.
- **III. Acessibilidade AA**: ✅ teclado, foco, ARIA, contraste, reduced-motion.
- **IV. Performance/SEO**: ✅ por design; ⏳ Lighthouse a medir pós-deploy; ⏳ WebP a entregar.
- **V. Conteúdo editável**: ✅ placeholders comentados, estruturas repetíveis, README.

Sem violações. Nenhuma entrada em Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-site-institucional-blog/
├── plan.md                 # Este arquivo
├── research.md             # Decisões (D-1..D-8) e trade-offs
├── data-model.md           # "Entidades" de conteúdo (post, bloco editável, contato)
├── quickstart.md           # Como rodar/verificar/publicar
├── contracts/              # Contratos: metadados/SEO e placeholders de conteúdo
└── checklists/requirements.md
```

### Source Code (repository root)

```text
index.html                  # Home (todas as seções com âncoras)
404.html
reflexoes/
├── index.html              # Listagem do blog
├── _template-post.html     # Modelo de post (não publicado)
└── posts/*.html            # 3 posts
assets/
├── css/styles.css          # Único CSS (tokens :root + componentes + responsivo)
├── js/main.js              # Menu mobile, header scrolled, ano dinâmico
├── images/ (+ README.md)   # Placeholders + guia de fotos
└── icons/                  # SVG + favicon/png/ico
sitemap.xml, robots.txt, site.webmanifest, .nojekyll
.github/workflows/deploy.yml
```

**Structure Decision**: Single project estático na raiz do repositório, servido
diretamente pelo GitHub Pages. CSS e JS únicos para simplicidade; um arquivo HTML por
página; template de post reutilizado por cópia (zero build).

## Complexity Tracking

> Sem violações de constituição — seção não aplicável.
