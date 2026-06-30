# Tasks — Lista atômica de implementação

> Derivada de [plan.md](./plan.md). Cada tarefa é pequena e marcável. **Um commit por
> tarefa concluída.** Nenhuma tarefa começa antes da aprovação das specs.

## Fase A — Fundação
- [ ] **A1** Criar estrutura de pastas (`assets/css`, `assets/js`, `assets/images`,
      `assets/icons`, `reflexoes/posts`) e `.nojekyll`.
- [ ] **A2** `styles.css`: tokens em `:root` (paleta, espaçamentos, raios, sombras,
      tipografia fluida `clamp()`), reset/normalize leve, regras base de tipografia e links.
- [ ] **A3** Carregar fontes (Playfair Display + Lato) com `preconnect` + `display=swap` e
      definir fallbacks de sistema.
- [ ] **A4** Utilitários globais: container `max-width`, espaçamento de seção, `:focus-visible`,
      skip-link, e bloco `@media (prefers-reduced-motion: reduce)`.

## Fase B — Estruturas compartilhadas (na home)
- [ ] **B1** Header/nav fixo translúcido + botão Agendar; estado ao rolar.
- [ ] **B2** Menu hambúrguer mobile acessível (`aria-expanded`, `Esc`, foco) — markup + CSS
      (JS na Fase D).
- [ ] **B3** Footer (logo, nav repetida, contato, frase, copyright com ano).

## Fase C — Home, seção a seção (`index.html`)
- [ ] **C1** Esqueleto da home: `<!doctype>`, `<head>` SEO base, landmarks, skip-link.
- [ ] **C2** Hero (placeholders FRASE_HERO/HERO_APOIO/CTAs + foto placeholder).
- [ ] **C3** Texto introdutório (INTRO_P1/INTRO_P2).
- [ ] **C4** "Como funciona" — 4 blocos + ícones SVG inline.
- [ ] **C5** "Sobre mim" (`#sobre`) — foto, textos, formação repetível, CTA.
- [ ] **C6** "Áreas de atendimento" (`#psicanalise`) — grid repetível + ícones.
- [ ] **C7** "Reflexões" (`#reflexoes`, fundo oliva) — título/apoio, 3 cards, CTA.
- [ ] **C8** FAQ (`#faq`) — accordion `<details>/<summary>` (5 itens).
- [ ] **C9** Contato/CTA final (`#contato`, fundo oliva) — WhatsApp/Instagram/E-mail/botão.

## Fase D — JavaScript (`main.js`, `defer`)
- [ ] **D1** Toggle do menu mobile (a11y + `Esc` + trap de foco simples).
- [ ] **D2** Scroll suave em âncoras respeitando `prefers-reduced-motion`.
- [ ] **D3** Ano dinâmico no rodapé.
- [ ] **D4** (Opcional) Estado "scrolled" do header e melhoria de animação do accordion.

## Fase E — Blog "Reflexões"
- [ ] **E1** `reflexoes/_template-post.html` — modelo comentado (head SEO + `<article>` + CTA).
- [ ] **E2** Post 1 — Ansiedade (~400–600 palavras, restrição ética, JSON-LD `Article`).
- [ ] **E3** Post 2 — Autoestima/relacionamentos (idem).
- [ ] **E4** Post 3 — Adolescência (idem).
- [ ] **E5** `reflexoes/index.html` — listagem (card por post: título, data, leitura, resumo).
- [ ] **E6** Conectar cards/CTA da home (C7) aos 3 posts e à listagem.

## Fase F — SEO / metadados
- [ ] **F1** `<head>` padronizado por página (title/description/canonical/OG/Twitter únicos).
- [ ] **F2** JSON-LD: home (`ProfessionalService`/`Person`), `FAQPage`, `Article` por post.
- [ ] **F3** `sitemap.xml` + `robots.txt` (com referência ao sitemap).
- [ ] **F4** Favicon + ícones a partir do monograma "G" (SVG + PNG) + `site.webmanifest`.
- [ ] **F5** Imagem OG padrão.

## Fase G — Assets & conteúdo
- [ ] **G1** Placeholders de imagem (hero, sobre, posts, OG) em WebP+JPG, otimizados,
      com dimensões definidas.
- [ ] **G2** `assets/images/README.md` — guia de fotos (quais, dimensões, formato, peso).

## Fase H — Deploy & docs
- [ ] **H1** `.github/workflows/deploy.yml` — GitHub Pages (configure/upload/deploy).
- [ ] **H2** `README.md` — publicar no Pages, editar textos (placeholders), adicionar post,
      trocar fotos, trocar dados de contato/CRP/URL.
- [ ] **H3** `404.html` amigável (opcional).

## Fase I — QA final
- [ ] **I1** Responsividade 320–1440px+ (sem scroll horizontal).
- [ ] **I2** Navegação por teclado (menu, links, accordion, foco visível, skip-link).
- [ ] **I3** Contraste AA de todos os pares cor/fundo.
- [ ] **I4** Lighthouse ≥ 95 nas 4 categorias.
- [ ] **I5** Validar JSON-LD; conferir sitemap/robots/canonical.
- [ ] **I6** Preencher o checklist final dos critérios de aceitação globais.
