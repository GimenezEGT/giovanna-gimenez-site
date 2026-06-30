# Tasks — Lista atômica de implementação

> Derivada de [plan.md](./plan.md). Cada tarefa é pequena e marcável. **Um commit por
> tarefa concluída.** Nenhuma tarefa começa antes da aprovação das specs.
>
> **Status (30/06/2026):** todas as tarefas de implementação concluídas. Pendências que
> dependem da cliente estão marcadas com ⏳ no checklist final (ver fim do arquivo).

## Fase A — Fundação
- [x] **A1** Criar estrutura de pastas (`assets/css`, `assets/js`, `assets/images`,
      `assets/icons`, `reflexoes/posts`) e `.nojekyll`.
- [x] **A2** `styles.css`: tokens em `:root` (paleta, espaçamentos, raios, sombras,
      tipografia fluida `clamp()`), reset/normalize leve, regras base de tipografia e links.
- [x] **A3** Carregar fontes (Playfair Display + Lato) com `preconnect` + `display=swap` e
      definir fallbacks de sistema.
- [x] **A4** Utilitários globais: container `max-width`, espaçamento de seção, `:focus-visible`,
      skip-link, e bloco `@media (prefers-reduced-motion: reduce)`.

## Fase B — Estruturas compartilhadas (na home)
- [x] **B1** Header/nav fixo translúcido + botão Agendar; estado ao rolar.
- [x] **B2** Menu hambúrguer mobile acessível (`aria-expanded`, `Esc`, foco) — markup + CSS
      (JS na Fase D).
- [x] **B3** Footer (logo, nav repetida, contato, frase, copyright com ano).

## Fase C — Home, seção a seção (`index.html`)
- [x] **C1** Esqueleto da home: `<!doctype>`, `<head>` SEO base, landmarks, skip-link.
- [x] **C2** Hero (placeholders FRASE_HERO/HERO_APOIO/CTAs + foto placeholder).
- [x] **C3** Texto introdutório (INTRO_P1/INTRO_P2).
- [x] **C4** "Como funciona" — 4 blocos + ícones SVG inline.
- [x] **C5** "Sobre mim" (`#sobre`) — foto, textos, formação repetível, CTA.
- [x] **C6** "Áreas de atendimento" (`#psicanalise`) — grid repetível + ícones.
- [x] **C7** "Reflexões" (`#reflexoes`, fundo oliva) — título/apoio, 3 cards, CTA.
- [x] **C8** FAQ (`#faq`) — accordion `<details>/<summary>` (5 itens).
- [x] **C9** Contato/CTA final (`#contato`, fundo oliva) — WhatsApp/Instagram/E-mail/botão.

## Fase D — JavaScript (`main.js`, `defer`)
- [x] **D1** Toggle do menu mobile (a11y + `Esc` + trap de foco simples).
- [x] **D2** Scroll suave em âncoras respeitando `prefers-reduced-motion`.
- [x] **D3** Ano dinâmico no rodapé.
- [x] **D4** (Opcional) Estado "scrolled" do header e melhoria de animação do accordion.

## Fase E — Blog "Reflexões"
- [x] **E1** `reflexoes/_template-post.html` — modelo comentado (head SEO + `<article>` + CTA).
- [x] **E2** Post 1 — Ansiedade (~400–600 palavras, restrição ética, JSON-LD `Article`).
- [x] **E3** Post 2 — Autoestima/relacionamentos (idem).
- [x] **E4** Post 3 — Adolescência (idem).
- [x] **E5** `reflexoes/index.html` — listagem (card por post: título, data, leitura, resumo).
- [x] **E6** Conectar cards/CTA da home (C7) aos 3 posts e à listagem.

## Fase F — SEO / metadados
- [x] **F1** `<head>` padronizado por página (title/description/canonical/OG/Twitter únicos).
- [x] **F2** JSON-LD: home (`ProfessionalService`/`Person`), `FAQPage`, `Article` por post.
- [x] **F3** `sitemap.xml` + `robots.txt` (com referência ao sitemap).
- [x] **F4** Favicon + ícones a partir do monograma "G" (SVG + PNG) + `site.webmanifest`.
- [x] **F5** Imagem OG padrão.

## Fase G — Assets & conteúdo
- [x] **G1** Placeholders de imagem (hero, sobre, OG) em **JPG**, com dimensões definidas.
      ⏳ Versões **WebP** ficam a cargo da cliente ao enviar as fotos reais (o `<picture>`
      já está pronto e cai no JPG enquanto o WebP não existir — ver `assets/images/README.md`).
- [x] **G2** `assets/images/README.md` — guia de fotos (quais, dimensões, formato, peso).

## Fase H — Deploy & docs
- [x] **H1** `.github/workflows/deploy.yml` — GitHub Pages (configure/upload/deploy).
- [x] **H2** `README.md` — publicar no Pages, editar textos (placeholders), adicionar post,
      trocar fotos, trocar dados de contato/CRP/URL.
- [x] **H3** `404.html` amigável (opcional).

## Fase I — QA final
- [x] **I1** Responsividade 320–1440px+ (sem scroll horizontal).
- [x] **I2** Navegação por teclado (menu, links, accordion, foco visível, skip-link).
- [x] **I3** Contraste AA de todos os pares cor/fundo.
- [~] **I4** Lighthouse ≥ 95 nas 4 categorias. ⏳ **Não medido neste ambiente** (sem rede
      para fontes/Lighthouse no sandbox). O site foi construído para a meta (JS mínimo,
      `font-display: swap`, imagens com dimensões, lazy-load, SEO completo). **Rodar a
      auditoria após o deploy**, já com a URL real e as fotos otimizadas.
- [x] **I5** Validar JSON-LD; conferir sitemap/robots/canonical.
- [x] **I6** Preencher o checklist final dos critérios de aceitação globais.
