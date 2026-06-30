# Plan — O *como*

> Arquitetura, decisões técnicas e ordem de implementação. Subordinado à
> [constitution.md](./constitution.md) e [specification.md](./specification.md).

## 1. Decisão central: HTML puro vs. gerador estático

**Recomendação: HTML puro, zero build.** Justificativa:

- A constitution prioriza **simplicidade e zero-config** no GitHub Pages.
- O site tem escopo pequeno e estável (1 home + 1 listagem + 3 posts).
- Um gerador (Eleventy) traria Node, `package.json`, passo de build no Actions e curva de
  manutenção para a cliente — custo desproporcional ao ganho com poucos posts.
- **Trade-off aceito:** sem layout-include automático, cada post repete o "esqueleto" HTML.
  Mitigação: um arquivo **`reflexoes/_template-post.html`** (modelo comentado, não publicado)
  + instruções no README para criar novos posts por cópia. A listagem é mantida manualmente
  (lista pequena).
- **Gatilho de reavaliação:** se a cliente passar a publicar com frequência (> ~1 post/mês),
  reabrir a adoção do Eleventy — mas **só com aprovação explícita** (constitution §3).

> Esta é a **Decisão D-1** que precisa de confirmação. As specs assumem HTML puro.

## 2. Arquitetura de arquivos

```
/
├── index.html                      # Home (single-page com âncoras)
├── 404.html                        # Página de erro amigável (opcional, recomendado)
├── reflexoes/
│   ├── index.html                  # Listagem do blog
│   ├── _template-post.html         # Modelo de post (não linkado; guia p/ novos posts)
│   └── posts/
│       ├── ansiedade-quando-tudo-parece-urgente.html
│       ├── autoestima-e-o-valor-que-atribuimos-a-nos.html
│       └── adolescencia-escutar-o-que-ainda-nao-tem-palavra.html
├── assets/
│   ├── css/
│   │   └── styles.css              # Único CSS (custom properties, layout, componentes)
│   ├── js/
│   │   └── main.js                 # Menu mobile, scroll suave, ano dinâmico, accordion*
│   ├── images/
│   │   ├── README.md               # Guia de fotos p/ a cliente (dimensões/formatos)
│   │   └── *.webp / *.jpg          # Placeholders (hero, sobre, posts, og-image)
│   └── icons/
│       └── *.svg                   # Ícones lineares (como/áreas/contato) + favicon/monograma
├── specs/                          # constitution, specification, plan, tasks
├── .github/workflows/deploy.yml    # Deploy para GitHub Pages
├── sitemap.xml
├── robots.txt
├── site.webmanifest                # (favicon/PWA mínimo) — opcional
├── .nojekyll                       # garante servir arquivos/pastas como estão
└── README.md                       # deploy + edição de conteúdo + novos posts + fotos
```

\* Accordion de FAQ usa `<details>/<summary>` nativo (sem JS); JS só melhora animação
respeitando `prefers-reduced-motion`.

## 3. Decisões técnicas

| # | Tema | Decisão |
|---|------|---------|
| T-1 | CSS | Um único `styles.css`. Tokens em `:root` (cores da constitution, espaçamentos, tipografia fluida via `clamp()`). Mobile-first com `min-width` media queries. |
| T-2 | Layout | Flexbox para componentes lineares; Grid para "Como funciona", "Áreas" e cards de Reflexões. `max-width` de conteúdo ~ 1100–1200px centralizado. |
| T-3 | Fontes | Google Fonts (Playfair Display + Lato) com `preconnect` + `display=swap`. Fallback: `Georgia, serif` (títulos) / `system-ui, sans-serif` (corpo). |
| T-4 | JS | Vanilla, em `main.js`, com `defer`. Funções: toggle do menu mobile (a11y + `Esc` + trap de foco simples), scroll suave (respeitando `prefers-reduced-motion`), ano dinâmico no rodapé. |
| T-5 | Ícones | SVG inline para ícones de seção (`aria-hidden`). Favicon/monograma "G" como SVG + PNG de fallback. |
| T-6 | Imagens | `<picture>` com WebP + fallback JPG; `loading="lazy"` (exceto hero), `width`/`height` explícitos, `alt` significativo. Placeholders leves versionados. |
| T-7 | Caminhos | **Relativos** sempre (`assets/...`, `../assets/...` nos posts). Sem `/` inicial. Testar em subpath. |
| T-8 | SEO | `<head>` parcial padronizado (title/description/canonical/OG/Twitter) replicado por página; JSON-LD por tipo de página; `sitemap.xml` + `robots.txt`. |
| T-9 | A11y | Landmarks semânticos, foco visível custom, `:focus-visible`, skip-link "Pular para o conteúdo", contraste AA validado para cada par cor/fundo. |
| T-10 | Deploy | GitHub Actions oficial do Pages (`actions/configure-pages` + `upload-pages-artifact` + `deploy-pages`) publicando a raiz. Branch padrão `main`. |

## 4. Estratégia de contraste (verificação AA)

Pares a validar (texto sobre fundo): marrom sobre creme; marrom sobre bege; creme sobre
oliva; marrom sobre sálvia (usar só em elementos grandes/decorativos se não passar AA para
texto pequeno). Botão oliva com texto creme. Documentar resultados na implementação.

## 5. Ordem de implementação (alto nível → detalhada em tasks.md)

1. **Fundação:** estrutura de pastas, `.nojekyll`, tokens CSS, reset, tipografia/fontes.
2. **Layout base + header/nav + footer** (compartilhados conceitualmente).
3. **Home seção a seção** (Hero → Intro → Como funciona → Sobre → Áreas → Reflexões → FAQ → Contato).
4. **JS** (menu, scroll, ano).
5. **Blog:** template de post, 3 posts, listagem, integração dos cards/CTA da home.
6. **SEO/metadados:** head padronizado, JSON-LD, sitemap, robots, favicon/ícones, OG image.
7. **Assets:** placeholders de imagem + README da pasta de imagens.
8. **Deploy:** workflow do GitHub Pages.
9. **README** principal (publicação + manutenção).
10. **QA final:** responsividade, teclado, contraste, Lighthouse, validação JSON-LD; checklist.

## 6. Riscos & mitigações

- **Lighthouse SEO/Perf < 95:** mitigar com imagens otimizadas, fontes `swap`, JS mínimo,
  dimensões explícitas. Rodar auditoria antes do "pronto".
- **Subpath do Pages quebrando assets:** caminhos relativos + teste local servindo de subpasta.
- **Conteúdo sensível (saúde mental):** revisar copy dos posts contra a restrição ética.

---

## Decisões abertas (precisam da sua confirmação antes de codar)

- **D-1 — Build:** confirmar **HTML puro / zero build** (recomendado) em vez de Eleventy.
- **D-2 — Fontes:** confirmar **Playfair Display + Lato** (padrão) — a alternativa
  Cormorant + Inter está disponível, mas a constitution fixa Playfair+Lato como padrão.
- **D-3 — Schema JSON-LD da home:** `ProfessionalService` + `Person` (recomendado para
  psicanalista que atende online) vs. `MedicalBusiness`/`LocalBusiness`. Influencia campos
  como endereço — atendimento é **online** (sem endereço físico público?).
- **D-4 — Dados reais:** confirmar se mantenho **placeholders** de telefone, e-mail,
  Instagram, WhatsApp e **CRP** (recomendado nesta fase) ou se você já tem os reais.
- **D-5 — Conteúdo dos posts e cards:** os títulos de exemplo dos cards da home
  (silêncio / ansiedade / repetição de relações) batem parcialmente com os temas dos posts
  (ansiedade / autoestima-relacionamentos / adolescência). Proposta: **alinhar os 3 cards
  aos 3 posts reais**. Confirmar.
- **D-6 — Áreas de atendimento:** manter as **7** áreas padrão (Relacionamentos, Autoestima,
  Ansiedade, Depressão, Autoconhecimento, Conflitos familiares, Adolescência)?
- **D-7 — Repositório/URL:** qual será o `usuario.github.io/repo`? Necessário para
  `canonical`, `sitemap.xml` e OG `url`. Posso usar um placeholder
  (`https://SEU-USUARIO.github.io/SEU-REPO/`) e documentar a troca no README.
- **D-8 — Git:** a pasta atual **não** é um repositório Git. Confirmar se devo rodar
  `git init` (commit por tarefa, como pede a metodologia) ou se você fará isso.
