# Quickstart — CMS do blog

## Desenvolvimento local
```bash
npm install
npm run dev        # Eleventy em modo --serve (http://localhost:8080)
npm run build      # gera _site/
```

## Configuração única (ações da pessoa usuária)

### 1. GitHub OAuth App
- GitHub → Settings → Developer settings → **OAuth Apps** → New.
- Homepage: URL do site. **Authorization callback URL:** a do Worker (passo 2), ex.:
  `https://<seu-worker>.workers.dev/callback`.
- Guarde **Client ID** e **Client Secret**.

### 2. Handler de OAuth (Cloudflare Worker — gratuito)
- Deploy do `sveltia-cms-auth` (repositório oficial do Sveltia) na Cloudflare Workers.
- Configure as variáveis `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET`.
- Anote a URL do Worker e coloque em `admin/config.yml` (`backend.base_url`).

### 3. Acesso para a autora (se não for a dona do repo)
- Repo → Settings → Collaborators → adicionar a Giovanna (acesso **Write**).
- Ela aceita o convite e passa a logar no painel com a conta GitHub dela.

## Uso pela autora
1. Acessar `…/admin/` e **Entrar com GitHub**.
2. Coleção **Reflexões** → **Novo** → preencher título, resumo, corpo e (opcional) capa/fotos.
3. **Publicar** → aguardar ~1–2 min (build automático) → post no ar.
4. Editar/excluir: abrir o post na lista, alterar/remover e salvar.

## Verificação
- Post novo aparece em `/reflexoes/` e abre em `/reflexoes/posts/<slug>.html`.
- `sitemap.xml` inclui o novo post; rascunhos não aparecem.
- Sem regressão: Lighthouse, AA, identidade visual.
