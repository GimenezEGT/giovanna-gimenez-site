# Research — CMS do blog

## Decisões

### Gerador estático: Eleventy (11ty)
- **Decisão:** usar Eleventy para gerar listagem, posts e sitemap a partir de Markdown.
- **Razão:** leve, sem framework de runtime, ótimo para Markdown→HTML, comunidade grande,
  zero JS no site final. Fácil replicar os templates atuais (Nunjucks).
- **Alternativas:** Astro/Hugo/Jekyll. Hugo (Go) exigiria outro toolchain; Jekyll tem
  peculiaridades no Pages; Astro traz mais peso/opinião. Eleventy é o mais simples p/ o caso.

### CMS: Sveltia CMS (backend GitHub)
- **Decisão:** Sveltia CMS (compatível com config do Decap, porém mais moderno/rápido).
- **Razão:** git-based (histórico/reversão), gratuito, UI em PT, upload de imagem, futuro
  ativo. Login GitHub sem depender de serviços descontinuados.
- **Alternativas:** Decap CMS (base, porém auth recomendada era Netlify Identity, **descontinuada**);
  Netlify CMS (renomeado p/ Decap). Sveltia é o sucessor prático.

### Autenticação: GitHub OAuth + Cloudflare Worker
- **Decisão:** GitHub OAuth App + `sveltia-cms-auth` (Cloudflare Worker gratuito) como handler.
- **Razão:** o backend GitHub exige troca de `code`→`token` com *client secret*, que não pode
  ficar no navegador; o Worker guarda o segredo. Gratuito e estável.
- **Alternativas:** Netlify Git Gateway/Identity (descontinuado); hospedar próprio servidor
  (custo/manutenção).

### Estrutura: fonte em `src/`, saída em `_site/`
- **Decisão:** mover arquivos servidos para `src/`; Eleventy gera `_site/` (publicado).
- **Razão:** padrão do Eleventy, deploy limpo, separa fonte de saída. Home/404/assets seguem
  como **passthrough** (inalterados).
- **Alternativas:** usar a raiz como input com muitos `.eleventyignore` — frágil.

### Preservar URLs dos posts
- **Decisão:** `permalink` no Eleventy mantém `/reflexoes/posts/<slug>.html` (slug = nome do
  arquivo Markdown). SEO/links existentes preservados.

## Pendências que dependem da usuária (ver quickstart)
- GitHub OAuth App (Client ID/Secret) + deploy do Worker de OAuth.
- Colaboradora com acesso de escrita (se a autora não for a dona do repo).
