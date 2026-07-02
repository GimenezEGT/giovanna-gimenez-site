# Contrato — CMS (Sveltia) e build

## Coleção "Reflexões" (admin/config.yml)
- **backend:** `github`, repo `GimenezEGT/giovanna-gimenez-site`, branch `main`,
  `base_url` = URL do handler OAuth (Cloudflare Worker).
- **media_folder:** `src/assets/images/posts` · **public_folder:** `/giovanna-gimenez-site/assets/images/posts`
  (ajustar ao subpath; se migrar para domínio próprio, vira `/assets/images/posts`).
- **collection** `post` (pasta `src/reflexoes/posts`, extensão `md`), campos:
  `title` (string), `date` (datetime), `description` (text), `cover` (image, opcional),
  `tempoLeitura` (string, opcional), `draft` (boolean, default false), `body` (markdown).
- **i18n/labels:** rótulos em português; `slug` a partir do título.

## Contrato de saída (build Eleventy)
- Cada post gera `/reflexoes/posts/<slug>.html` com **o mesmo shell** das páginas atuais:
  `<head>` (title/description/canonical/OG/Twitter), CSS crítico inline + CSS assíncrono,
  header, `<article class="artigo">`, JSON-LD `Article`, rodapé.
- `reflexoes/index.html` gerado com um `.post-card` por post (título, data, resumo, link,
  miniatura se houver `cover`).
- `sitemap.xml` gerado incluindo home, listagem e todos os posts publicados.
- **Rascunhos** (`draft: true`) não entram no output público.

## Contrato de deploy (GitHub Actions)
- `npm ci` → `npx @11ty/eleventy` (gera `_site/`) → `upload-pages-artifact path: _site` →
  `deploy-pages`. Concurrency `pages` com `cancel-in-progress: false`.

## Invariantes (não podem regredir)
- URLs dos 3 posts atuais preservadas.
- Identidade visual, acessibilidade AA, 1 `<h1>`/página, JSON-LD válido, sem scroll horizontal.
- Site público continua funcionando se o painel/admin estiver indisponível.
