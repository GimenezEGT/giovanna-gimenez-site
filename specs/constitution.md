# Constitution — Site "Giovanna Gimenez · Psicanálise Clínica"

> Princípios **invioláveis** do projeto. Qualquer decisão de implementação que conflite
> com este documento deve ser barrada ou explicitamente renegociada antes de prosseguir.

## 1. Propósito

Site institucional de página única (single-page com âncoras) + uma seção de blog
("Reflexões / Caderno Clínico") para uma psicanalista clínica que atende online.
Objetivos, em ordem de prioridade:

1. Transmitir **acolhimento, serenidade e profissionalismo**.
2. **Converter** visitantes em agendamentos (CTAs claros e recorrentes).
3. Construir **presença orgânica** no Google ao longo do tempo via conteúdo (SEO + blog).

**Público-alvo:** adolescentes e adultos buscando atendimento psicanalítico online.

## 2. Stack (obrigatório)

- **HTML5 semântico** + **CSS moderno** (custom properties, Flexbox, Grid) +
  **JavaScript vanilla mínimo**.
- **Proibido:** React, Vue, Svelte, jQuery ou qualquer framework/biblioteca de runtime pesada.
- **Ícones:** SVG inline (ou SVGs estáticos leves estilo Lucide). Nunca uma fonte de ícones
  ou biblioteca pesada. **Sem emojis no produto final.**
- **Fontes:** Google Fonts permitido, carregado com `preconnect` + `font-display: swap`.
- **Sem dependências de runtime externas críticas.** O site deve renderizar e funcionar
  mesmo se o Google Fonts falhar (fallback de fontes de sistema).

## 3. Build & Deploy (obrigatório)

- **Hospedagem:** GitHub Pages. O site é 100% estático; **sem backend** e sem build
  server obrigatório no deploy.
- **Meta: zero build.** Arquivos servidos diretamente. Se qualquer ferramenta de build for
  proposta, ela precisa de aprovação explícita do cliente *antes* de ser adotada, e o output
  final precisa ser estático e versionado.
- **Caminhos relativos** para todos os assets (GitHub Pages serve em subpath
  `usuario.github.io/repo/`). Nenhum caminho absoluto iniciando em `/`.
- Deploy via **GitHub Actions** (`.github/workflows/deploy.yml`) publicando o conteúdo
  estático no Pages, ou via branch `gh-pages` — definido no plan.
- Incluir `.nojekyll` se necessário para servir pastas/arquivos corretamente.

## 4. Qualidade — padrões inegociáveis

- **Responsivo mobile-first**, sem scroll horizontal, testado de **320px a 1440px+**.
- **Acessibilidade WCAG 2.1 AA:**
  - Contraste AA para todo texto sobre cada fundo.
  - Navegação completa por **teclado** (foco visível, ordem lógica, menu mobile operável).
  - `alt` significativo em todas as imagens informativas; `alt=""` em decorativas.
  - Landmarks/roles ARIA corretos (`header`, `nav`, `main`, `footer`, etc.).
  - `prefers-reduced-motion` respeitado — animações sutis, opcionais e desativáveis.
- **Performance — Lighthouse alvo ≥ 95** em Performance, Acessibilidade,
  Práticas Recomendadas e SEO.
  - Imagens otimizadas (WebP com fallback), `loading="lazy"`, dimensões explícitas
    (`width`/`height`) para evitar CLS.
  - CSS/JS enxutos; sem render-blocking desnecessário.
- **SEO de primeira classe** (ver specification): títulos/descrições únicos, OG/Twitter,
  JSON-LD válido, `sitemap.xml`, `robots.txt`, `canonical`, headings hierárquicos
  (um único `<h1>` por página), `lang="pt-BR"`.

## 5. Conteúdo & Editabilidade

- Toda copy marcada com placeholder no prompt deve ser **facilmente editável** por uma
  pessoa não-técnica: comentários HTML marcados (ex.: `<!-- FRASE_HERO -->`) delimitando
  o trecho editável, com valor padrão preenchido.
- Estruturas repetíveis (formação, áreas de atendimento, cards de reflexões) devem ser
  fáceis de adicionar/remover/reordenar (blocos HTML claramente comentados).
- Dados sensíveis (telefone, e-mail, Instagram, CRP) entram como **placeholders**
  claramente identificados, para troca posterior pela cliente.

## 6. Identidade visual (fixa)

### Paleta (CSS custom properties em `:root`)

| Token            | Hex       | Uso                                            |
|------------------|-----------|------------------------------------------------|
| `--cor-creme`    | `#F6F3EF` | Fundo principal                                |
| `--cor-bege`     | `#E7DFCF` | Fundos de seção alternados, cards              |
| `--cor-oliva`    | `#6B6F4E` | Botões primários, seções de destaque, CTA      |
| `--cor-salvia`   | `#A7AD8A` | Detalhes, hovers, traços decorativos           |
| `--cor-marrom`   | `#3A352F` | Texto principal, títulos                       |
| `--cor-cinza`    | `#D9D6CF` | Bordas, divisórias, linhas finas               |

Paleta oficial do **brand board** da profissional. Texto creme sobre oliva nas seções
escuras. Garantir contraste AA em todas as combinações.

### Logo (oficial)

A marca oficial é o monograma "g" em arco com raminho botânico + wordmark
"GIOVANNA GIMENEZ · PSICANÁLISE CLÍNICA" (em oliva). Assets em `assets/logo/`
(`monograma.png`, `lockup.png`/`.webp`) e ícones derivados em `assets/icons/`.
Tagline oficial: *"escuta que acolhe, presença que transforma."*

### Tipografia

- **Títulos:** Playfair Display (serifada).
- **Corpo:** Lato.
- Escala tipográfica **fluida** com `clamp()`.
- `font-display: swap` + fallbacks de sistema (serif para títulos, sans-serif para corpo).

### Estética

Imagens de atmosfera (caderno, livro, luz de janela, cadeira, plantas, cerâmica, madeira,
tons terrosos), nunca corporativas. Placeholders versionados em `/assets/images/` com
nomes descritivos e `README` orientando a cliente sobre fotos, dimensões e formatos.

## 7. Processo (Spec-Driven Development)

1. Specs primeiro (`constitution` → `specification` → `plan` → `tasks`).
2. **Nenhum** HTML/CSS/JS de implementação antes da aprovação explícita das specs.
3. Implementação por tarefas atômicas; **um commit por tarefa concluída** com mensagem clara.
4. Ao final, checklist confirmando cada critério de aceitação global.

## 8. Definição de Pronto (Definition of Done)

Uma tarefa só está "pronta" quando: atende à spec, é responsiva (320–1440px+), acessível
por teclado, mantém contraste AA, não introduz erro de console, e foi commitada.
