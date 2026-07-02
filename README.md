# Giovanna Gimenez · Psicanálise Clínica — Site

Site institucional estático (HTML + CSS + JavaScript vanilla) publicado no **GitHub Pages**.
A **home** é HTML estático; o **blog ("Reflexões")** é gerado pelo **Eleventy** a partir de
Markdown, e pode ser alimentado por um **painel visual (Sveltia CMS)** — ver abaixo.

- **Acessível** (WCAG 2.1 AA), **responsivo** (320px → 1440px+) e **otimizado para SEO**.
- **Blog com painel:** posts em Markdown, publicados por um CMS com login e "Publicar".

---

## 📝 Painel do blog (para quem escreve, sem código)

Acesse **`…/admin/`**, faça login e crie/edite/exclua posts com fotos, pela interface.
Ao publicar, o GitHub Actions gera o site e publica em ~1–2 min.
**Configuração inicial e uso passo a passo:** [`specs/003-cms-blog/quickstart.md`](specs/003-cms-blog/quickstart.md).

---

## 📁 Estrutura

```
src/                          → FONTE do site (Eleventy gera _site/)
  index.html                  → Página inicial (estática, todas as seções)
  404.html
  _includes/base.njk, post.njk→ Modelos (head/header/rodapé e layout do artigo)
  reflexoes/
    index.njk                 → Listagem do blog (gerada da coleção de posts)
    posts/*.md                → Os textos, em Markdown (editados pelo painel)
  sitemap.njk                 → Sitemap (gerado)
  assets/                     → css, js, images (+ images/posts = uploads do painel), icons, logo
  admin/                      → Painel Sveltia CMS (index.html + config.yml)
.eleventy.js, package.json     → Configuração do gerador (build)
.github/workflows/deploy.yml   → Build (Eleventy) + publicação no GitHub Pages
specs/                         → Documentos do projeto (specs/003-cms-blog = o painel)
_site/                         → Saída gerada (não versionada)
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

**Jeito recomendado (sem código): pelo painel.** Acesse `…/admin/`, faça login, clique em
**Novo**, preencha título/resumo/conteúdo, anexe fotos e **Publique**. A listagem, o sitemap
e a página do post são gerados automaticamente. Fotos vão para `src/assets/images/posts/`.

**Alternativa técnica (Markdown):** crie um arquivo em `src/reflexoes/posts/<slug>.md`
com o front matter (`title`, `date`, `description`, `resumo`, `tempoLeitura`, opcional
`cover`) e o texto em Markdown. O nome do arquivo vira a URL (`/reflexoes/posts/<slug>.html`).
Não é preciso mexer na listagem nem no sitemap — o Eleventy gera tudo a partir da pasta.

> As fotos no corpo do texto são inseridas pelo próprio editor do painel; a **capa** é o
> campo "Foto de capa". Sempre preencha a descrição da imagem (acessibilidade).

---

## 🖼️ Como trocar as fotos

Veja o guia detalhado em [`assets/images/README.md`](assets/images/README.md). Em resumo:
substitua os arquivos placeholder **mantendo os mesmos nomes** (`giovanna-hero.jpg`,
`giovanna-sobre.jpg`, `og-image.jpg`) e, se possível, gere também as versões `.webp`
(mais leves). As proporções estão na tabela daquele guia.

---

## 🎨 Identidade visual

Cores e fontes ficam centralizadas no topo de `assets/css/styles.css` (bloco `:root`).
Paleta oficial (brand board): creme `#F6F3EF`, bege `#E7DFCF`, oliva `#6B6F4E`,
sálvia `#A7AD8A`, marrom `#3A352F`, cinza `#D9D6CF`. Fontes: **Playfair Display** (títulos)
e **Lato** (texto).

**Logo oficial:** o monograma "g" e o lockup completo ficam em `assets/logo/`
(`monograma.png` no cabeçalho; `lockup.png`/`.webp` para usos maiores). Os favicons/ícones
em `assets/icons/` são derivados do monograma. Tagline: *"escuta que acolhe, presença que
transforma."*

> ⚡ **Nota de performance (home):** por velocidade, o `index.html` tem um pequeno bloco de
> **CSS crítico embutido** no `<head>` (um subconjunto de `styles.css` para o topo da página),
> e a folha completa carrega de forma assíncrona. Se você mudar **cores, cabeçalho ou o hero**
> em `styles.css`, ajuste também esse bloco embutido no `index.html` (há um comentário no local).
> As demais páginas não têm esse bloco — nelas basta editar o `styles.css`.

---

## 💻 Pré-visualizar localmente

O blog é gerado pelo Eleventy, então o preview local usa Node:

```bash
npm install       # só na primeira vez
npm run dev       # servidor em http://localhost:8080 (recarrega ao salvar)
# ou: npm run build  → gera a pasta _site/
```

---

## ✅ Manutenção

- O **ano** no rodapé é atualizado automaticamente por JavaScript.
- O site funciona mesmo sem JavaScript (o menu vira links empilhados).
- Documentos de planejamento e decisões estão em [`specs/`](specs/).
