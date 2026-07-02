# Implementation Plan: Painel de administração do blog (CMS)

**Branch**: `feat/cms-blog-decap` | **Date**: 2026-07-02 | **Spec**: [spec.md](./spec.md)

## Summary

Dar à autora leiga um **painel visual** (Sveltia CMS) para criar/editar/excluir posts do
Caderno Clínico e enviar fotos, com login e "publicar", sem tocar em HTML. Os posts passam a
ser **Markdown** e um **gerador estático (Eleventy)** monta as páginas no padrão atual do
site (head, CSS crítico, JSON-LD, header/rodapé), publicando via **GitHub Actions** no
GitHub Pages. Site permanece **estático e gratuito**; adiciona-se uma etapa de **build**
(emenda à constituição aprovada).

## Technical Context

**Linguagem/Runtime**: HTML/CSS/JS vanilla (inalterado no runtime do site) + **Node.js**
apenas em tempo de build (CI).
**Gerador**: **Eleventy (@11ty/eleventy)** — templates Nunjucks; converte Markdown→HTML.
**CMS**: **Sveltia CMS** (arquivos estáticos em `admin/`), backend **GitHub**.
**Auth**: GitHub OAuth App + handler gratuito (Cloudflare Worker `sveltia-cms-auth`).
**Build/Deploy**: GitHub Actions instala deps, roda Eleventy (`_site/`) e publica no Pages.
**Storage**: conteúdo versionado no repositório (Markdown + imagens).
**Constraints**: estático/gratuito; sem regressão de performance/acessibilidade/identidade;
URLs dos posts preservadas; site público funciona mesmo se o painel estiver fora do ar.

## Constitution Check

Referência: [.specify/memory/constitution.md](../../.specify/memory/constitution.md).

- **I. Estático/zero build** → **EMENDA APROVADA**: passa a permitir **um** passo de build
  (Eleventy) desde que o output seja estático, versionável e publicado no Pages. Justificativa
  em Complexity Tracking. (Constituição será atualizada nesta feature.)
- **II. Stack vanilla / sem frameworks de runtime** → ✅ mantido: Eleventy é build-time; o
  site entregue continua HTML/CSS/JS vanilla. Sveltia é app estático de admin, isolado.
- **III. Acessibilidade AA** → ✅ preservada (mesmos templates/estilos).
- **IV. Performance/SEO** → ✅ mantida (mesmo HTML final; JSON-LD/sitemap gerados).
- **V. Conteúdo editável por leigos** → ✅ **reforçada** (é o objetivo da feature).

## Project Structure

Adota-se a estrutura padrão do Eleventy: fonte em `src/`, saída em `_site/` (publicada).

```text
src/
├── index.html                 # home (passthrough, inalterada)
├── 404.html                   # passthrough
├── robots.txt, site.webmanifest, .nojekyll
├── assets/                    # css, js, icons, images, logo (passthrough)
│   └── images/posts/          # NOVO: uploads do CMS (fotos dos posts)
├── _includes/
│   ├── base.njk               # <head> + header + rodapé (extraído do HTML atual)
│   └── post.njk               # layout de artigo (artigo__… + JSON-LD Article)
├── reflexoes/
│   ├── index.njk              # listagem GERADA a partir da coleção de posts
│   └── posts/
│       └── *.md               # posts em Markdown (front matter + corpo)
└── sitemap.njk                # sitemap GERADO (inclui posts automaticamente)

admin/                         # painel (passthrough)
├── index.html                 # carrega Sveltia CMS
└── config.yml                 # coleção "Reflexões", media, backend: github

.eleventy.js                   # config: passthrough, coleções, permalinks (URLs atuais)
package.json                   # devDependency @11ty/eleventy; script build
_site/                         # OUTPUT (gitignored) — publicado no Pages
.github/workflows/deploy.yml   # passa a: npm ci → eleventy → upload _site → deploy
```

**Structure Decision**: mover os arquivos servidos para `src/` e gerar `_site/`. **Home, 404
e assets** entram como **passthrough** (inalterados). Apenas **listagem, posts e sitemap**
passam a ser **gerados** — assim, publicar/excluir um post **atualiza listagem e sitemap
automaticamente** (FR-004). Os 3 cards de destaque na home permanecem manuais nesta fase.

## Fluxo de publicação (visão do usuário)

1. Autora acessa `…/admin/`, faz **login com GitHub**.
2. Escreve o post (título, resumo, corpo, fotos) e clica **Publicar**.
3. Sveltia grava um **commit** (Markdown + imagem) no repositório.
4. **GitHub Actions** roda Eleventy e **publica** o site atualizado (~1–2 min).

## Complexity Tracking

| Violação | Por que é necessária | Alternativa mais simples rejeitada porque |
|----------|----------------------|-------------------------------------------|
| Build (Eleventy) vs. "zero build" | CMS amigável exige separar conteúdo (Markdown) do template; gerar HTML no CI evita que a autora toque em `<head>`/SEO | Editar HTML cru pelo CMS é frágil e quebra estrutura/SEO; não atende leigos |
| Dependência externa (Cloudflare Worker OAuth) | Login GitHub no Sveltia exige troca de código OAuth com segredo (não pode ficar no cliente) | Netlify Identity (mais simples) está **descontinuado** — risco futuro |

## Ações que dependem da pessoa usuária (fora do que o agente implementa)

- Criar um **GitHub OAuth App** (Client ID/Secret).
- Publicar o **handler de OAuth** gratuito (Cloudflare Worker `sveltia-cms-auth`) com o segredo.
- (Se a Giovanna for publicar) adicioná-la como **colaboradora** com acesso de escrita.
- Passo a passo em [quickstart.md](./quickstart.md).
