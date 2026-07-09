# Implementation Plan: Migração de domínio (site-raiz) + Google Analytics

**Branch**: `feat/006-dominio-analytics` | **Date**: 2026-07-08 | **Spec**: [spec.md](./spec.md)

## Summary

Duas mudanças de baixo risco, sem tocar em layout/conteúdo: (1) **migrar a URL base** de
projeto-subpath (`gimenezegt.github.io/giovanna-gimenez-site/`) para o **site-raiz** da cliente
(`giovannagimenez98.github.io/`), atualizando a fonte única de URL (`site.json`), os metadados
hardcoded da home, `robots.txt`, `404.html` e a config do CMS; (2) **instalar o GA4**
(`G-EPFLCGTMPV`) via snippet `gtag.js` assíncrono no `<head>` de todas as páginas (home, blog via
`base.njk`, e `404.html`). Navegação e assets já são relativos → nada de links quebrados na raiz.

## Technical Context

**Linguagem/stack**: HTML5 + Nunjucks (Eleventy) + JSON de dados. Um único script de terceiros
(GA4 `gtag.js`), carregado assíncrono. Sem frameworks novos.

**Fonte/estrutura**:
- URL base única em `src/_data/site.json` (`url`) → consumida por `src/sitemap.njk`,
  `src/_includes/base.njk` (canonical/OG do blog) e `src/reflexoes/posts/posts.11tydata.js`
  (JSON-LD dos posts).
- Home `src/index.html` é **estática/passthrough** (não usa `site.json`) → URLs de SEO hardcoded.
- `src/robots.txt` (Sitemap), `src/404.html` (links absolutos), `src/admin/config.yml` (CMS).

**Plataforma-alvo**: GitHub Pages estático, servido na **raiz** de `giovannagimenez98.github.io`.

**Project Type**: site estático + blog (Eleventy).

**Performance Goals**: Lighthouse/PSI **≥ 95** — o `gtag.js` entra `async`, sem bloquear render;
o LCP (foto do hero) não é afetado.

**Constraints**: sem mudança visual (FR-011); site 100% funcional sem o analytics (FR-010);
navegação/assets relativos não podem regredir (FR-006).

**Scale/Scope**: config/metadados de todas as páginas + 1 snippet de analytics.

## Constitution Check

*GATE: aprovado antes do design e re-checado após.*

| Princípio | Status | Nota |
|-----------|:------:|------|
| I. Estático, build leve | ✅ | Só edições de config/HTML; nenhum build novo. Deploy Eleventy inalterado. |
| II. Vanilla, sem frameworks | ✅ | GA4 é **script de analytics de terceiros** (requisito do cliente), não um framework de runtime; carregado `async`; o site funciona sem ele (FR-010). Nenhuma lib nova de UI. |
| III. Acessibilidade AA (NON-NEG.) | ✅ | Sem mudança de UI/conteúdo → sem impacto de acessibilidade. |
| IV. Performance/SEO ≥95 | ✅ | `gtag.js` `async` (não bloqueia); **melhora** o SEO (canonical/sitemap/OG corretos no domínio real). |
| V. Editável por leigos | ✅ | URL base fica na fonte única `site.json`; CMS apontado para o repo da cliente. |
| Identidade visual (fixa) | ✅ | Nada de paleta/tipografia/layout muda. |

**Resultado**: sem violações → sem Complexity Tracking. Observação: consentimento LGPD de cookies
é item futuro (fora do escopo desta feature, conforme spec).

## Abordagem técnica (decisões / "research")

1. **URL base única (blog + sitemap)** — *Decisão*: editar `src/_data/site.json` →
   `"url": "https://giovannagimenez98.github.io"` (sem barra final, mantendo o padrão atual:
   `sitemap.njk` usa `{{ site.url }}/` e `base.njk` usa `{{ site.url }}{{ page.url }}`).
   *Rationale*: uma mudança corrige canonical/OG do blog inteiro, o `sitemap.xml` e o JSON-LD dos
   posts de uma vez (FR-001/FR-003).

2. **Metadados hardcoded da home** — *Decisão*: em `src/index.html`, substituir a string base
   `https://gimenezegt.github.io/giovanna-gimenez-site` → `https://giovannagimenez98.github.io`
   (de-subpath automático). Cobre canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD
   `url`/`image` e o comentário de referência. *Rationale*: a home é passthrough e não lê
   `site.json` (FR-002).

3. **robots.txt e 404.html** — *Decisão*: mesma substituição de string base nos dois arquivos.
   No `404.html` isso conserta favicon, CSS e o link "voltar ao início" (FR-004/FR-005).
   *Alternativa considerada*: tornar o 404 relativo — descartada por simplicidade e porque a URL
   absoluta no domínio certo também é válida e explícita.

4. **CMS admin** — *Decisão*: em `src/admin/config.yml`, `repo:` →
   `GiovannaGimenez98/giovannagimenez98.github.io` e `public_folder:` → `/assets/images/posts`
   (raiz). *Rationale*: FR-007. O OAuth (Worker) é infra à parte (fora do código).

5. **Google Analytics GA4** — *Decisão*: inserir o snippet oficial `gtag.js` (com `async`) no
   `<head>`, o mais alto possível, em:
   - `src/index.html` (home estática),
   - `src/_includes/base.njk` (cobre a listagem do blog e **todos** os posts),
   - `src/404.html`.
   ID `G-EPFLCGTMPV`. *Rationale*: cobertura total das páginas com o mínimo de pontos de inserção
   (FR-008); `async` preserva performance (FR-009); nada essencial depende dele (FR-010).
   *Alternativa rejeitada*: incluir só na home — deixaria blog/posts sem medição.

6. **Verificação de portabilidade na raiz** — *Decisão*: como navegação/assets já são relativos
   (`assets/…`, `{{ root }}`=`../`), validar no build/preview servindo na **raiz** que não há link
   quebrado nem referência ao subpath antigo (FR-006/SC-005). *Rationale*: garantir que a mudança
   de base não regrediu nada.

## Project Structure

### Documentação (esta feature)
```text
specs/006-dominio-analytics/
├── spec.md          # concluído
├── plan.md          # este arquivo
├── checklists/requirements.md
└── tasks.md         # próximo (/speckit-tasks)
```
> `research.md`, `data-model.md`, `contracts/`, `quickstart.md`: **N/A** — mudança de
> config/metadados + 1 snippet; sem dados/algoritmos/interfaces novas (convenção enxuta das
> features 002–005).

### Código (arquivos tocados)
```text
src/_data/site.json                # url base -> domínio novo (raiz)
src/index.html                     # metadados SEO hardcoded + snippet GA4
src/robots.txt                     # Sitemap -> domínio novo
src/404.html                       # links absolutos -> domínio novo + snippet GA4
src/admin/config.yml               # repo + public_folder do CMS
src/_includes/base.njk             # snippet GA4 (cobre blog: listagem + posts)
```
**Structure Decision**: mudança cirúrgica de config/metadados + analytics. Nenhuma alteração de
layout/estilo/conteúdo (FR-011).

## Complexity Tracking

Sem violações de constituição → nada a justificar.
