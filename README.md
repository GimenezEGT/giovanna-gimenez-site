# Giovanna Gimenez · Psicanálise Clínica — Site

Site institucional estático (HTML + CSS + JavaScript vanilla), sem build, pronto para
**GitHub Pages**. Inclui página única com âncoras e uma seção de blog ("Reflexões").

- **Acessível** (WCAG 2.1 AA), **responsivo** (320px → 1440px+) e **otimizado para SEO**.
- **Sem frameworks** e **sem etapa de build** — os arquivos são servidos como estão.

---

## 📁 Estrutura

```
index.html                  → Página inicial (todas as seções)
404.html                    → Página de erro amigável
reflexoes/
  index.html                → Listagem do blog
  _template-post.html       → Modelo para criar novos posts (não publicado)
  posts/*.html              → Os textos publicados
assets/
  css/styles.css            → Todo o visual (cores, tipografia, layout)
  js/main.js                → Menu mobile, cabeçalho ao rolar, ano do rodapé
  images/  (+ README.md)    → Fotos (placeholders) e guia de fotos
  icons/                    → Ícones e favicons
specs/                      → Documentos do projeto (constitution, specification, plan, tasks)
sitemap.xml, robots.txt     → SEO
.github/workflows/deploy.yml→ Publicação automática no GitHub Pages
```

---

## 🚀 Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `site`) e envie estes arquivos para a branch `main`.
2. No GitHub, vá em **Settings → Pages**.
3. Em **Build and deployment → Source**, escolha **GitHub Actions**.
4. Pronto: a cada `push` na `main`, o site é publicado automaticamente pelo workflow
   [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
5. O endereço será algo como `https://SEU-USUARIO.github.io/SEU-REPO/`.

> **Importante — ajuste a URL.** Procure e substitua, em todos os arquivos, o texto
> `https://SEU-USUARIO.github.io/SEU-REPO/` pela URL real do seu site. Isso afeta os
> campos `canonical`, Open Graph, JSON-LD, `sitemap.xml` e `robots.txt` (importantes
> para o Google). Arquivos a revisar: `index.html`, `reflexoes/index.html`, cada post em
> `reflexoes/posts/`, `sitemap.xml` e `robots.txt`.

### Alternativa sem Actions
Se preferir, em **Settings → Pages → Source** escolha **Deploy from a branch**, selecione
`main` e a pasta `/ (root)`. O arquivo `.nojekyll` (já incluído) garante que tudo seja
servido corretamente.

---

## ✏️ Como editar os textos

Todos os textos editáveis da home estão marcados por comentários no `index.html`, por exemplo:

```html
<!-- FRASE_HERO:início -->
<p class="hero__frase">Há histórias que precisam...</p>
<!-- FRASE_HERO:fim -->
```

Basta alterar o texto **entre** os comentários. Principais marcadores:
`FRASE_HERO`, `HERO_APOIO`, `INTRO_P1`, `INTRO_P2`, `SOBRE_TITULO`, `SOBRE_TEXTO`,
`SOBRE_FORMACAO`, `AREAS_ATENDIMENTO`, `REFLEXOES_TITULO`, `REFLEXOES_APOIO`.

- **Adicionar um item de formação:** em "Sobre mim", copie uma linha `<li>...</li>`
  dentro de `<ul class="formacao">`.
- **Adicionar/remover uma área de atendimento:** copie uma `<li class="area">...</li>`
  dentro de `<ul class="areas-grid">`.

---

## 📞 Como trocar os dados de contato (e o CRP)

Os dados são **placeholders**. Faça "localizar e substituir" em **todos** os arquivos:

| Placeholder atual                         | Onde aparece                          | Troque por |
|-------------------------------------------|---------------------------------------|------------|
| `5511999999999`                           | links de WhatsApp (`wa.me/...`)       | seu número com DDI+DDD, só dígitos |
| `(11) 99999-9999`                         | texto exibido do telefone             | telefone formatado |
| `contato@giovannagimenez.com.br`          | links e textos de e-mail              | seu e-mail |
| `giovannagimenez.psicanalise`             | links/handle do Instagram             | seu @ do Instagram |
| `CRP 00/00000`                            | "Sobre mim" (formação)                | seu número de registro |

> Dica: o link de WhatsApp tem o formato `https://wa.me/5511999999999`
> (55 = Brasil, 11 = DDD, seguido do número, sem espaços ou símbolos).

---

## 📝 Como adicionar um novo post (Reflexões)

1. Copie `reflexoes/_template-post.html` para
   `reflexoes/posts/titulo-do-post.html` (nome **sem acentos**, **sem espaços**, com hífens).
2. Substitua os campos `{{ ... }}` (título, descrição, data, conteúdo).
3. Adicione o post na **listagem**: em `reflexoes/index.html`, copie um bloco
   `<article class="post-card">...</article>` e ajuste título, resumo, data e link.
4. (Opcional) Destaque-o na **home**: em `index.html`, seção "Reflexões", há 3 cards.
5. Adicione a URL do novo post em `sitemap.xml` (copie um bloco `<url>...</url>`).

---

## 🖼️ Como trocar as fotos

Veja o guia detalhado em [`assets/images/README.md`](assets/images/README.md). Em resumo:
substitua os arquivos placeholder **mantendo os mesmos nomes** (`giovanna-hero.jpg`,
`giovanna-sobre.jpg`, `og-image.jpg`) e, se possível, gere também as versões `.webp`
(mais leves). As proporções estão na tabela daquele guia.

---

## 🎨 Identidade visual

Cores e fontes ficam centralizadas no topo de `assets/css/styles.css` (bloco `:root`).
Paleta: creme `#F6F2EB`, bege `#E8DDCF`, oliva `#6C7050`, sálvia `#A7AE8C`,
marrom `#3D352D`, cinza `#D9D6CF`. Fontes: **Playfair Display** (títulos) e **Lato** (texto).

---

## 💻 Pré-visualizar localmente

Como são arquivos estáticos, você pode abrir o `index.html` no navegador. Para um
ambiente mais fiel (caminhos relativos), rode um servidor local:

```bash
# Python 3
python -m http.server 8000
# depois acesse http://localhost:8000
```

---

## ✅ Manutenção

- O **ano** no rodapé é atualizado automaticamente por JavaScript.
- O site funciona mesmo sem JavaScript (o menu vira links empilhados).
- Documentos de planejamento e decisões estão em [`specs/`](specs/).
