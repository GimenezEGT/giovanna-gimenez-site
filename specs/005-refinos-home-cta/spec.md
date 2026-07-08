# Feature Specification: Refinos da home — hero above-the-fold, foto no intro, FAQ e link de agendamento

**Feature Branch**: `feat/005-refinos-home-cta`

**Created**: 2026-07-07

**Status**: Draft

**Input**: User description: "(1) reduzir a frase do hero para os botões aparecerem na primeira
dobra; (2) foto full-bleed com fade no bloco 'Existem momentos…' (espelhado: foco à esquerda,
fade à direita no creme) usando capa_gigi_2.png; (3) trocar a resposta do FAQ 'Aceita convênio?';
(4) link oficial de agendamento (https://corpora.bio/2d251bdb0e) nos botões de agendamento e
seção de contato dedicada (WhatsApp, e-mail, Instagram — placeholders mantidos)."

> Builds sobre as features [001](../001-site-institucional-blog/spec.md) (home) e
> [004](../004-hero-imersivo/spec.md) (hero imersivo). Não muda paleta, tipografia nem
> arquitetura — apenas conteúdo/ajustes de layout da home.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - CTA visível na primeira dobra (Priority: P1) 🎯 MVP

Ao abrir a home no desktop e no mobile, a pessoa vê a frase de abertura do hero **e** os botões
"Agendar sua primeira conversa" e "Saiba mais" **sem precisar rolar a página**. A frase do hero
é reduzida o suficiente para que a chamada para ação (CTA) caiba na primeira dobra, aumentando a
chance de contato logo de cara.

**Why this priority**: É o objetivo de conversão mais direto — CTA acima da dobra é o que mais
afeta o contato. Entrega valor sozinho.

**Independent Test**: Abrir a home em viewport de desktop (~1366×768) e mobile (~390×844) e
confirmar que os dois botões do hero aparecem sem scroll.

**Acceptance Scenarios**:

1. **Given** a home no desktop (altura ~768px), **When** a página carrega, **Then** a frase do
   hero, o nome, e os dois botões do hero ficam visíveis sem rolar.
2. **Given** a home no mobile (~390×844), **When** a página carrega, **Then** pelo menos o botão
   primário "Agendar sua primeira conversa" fica visível sem rolar.
3. **Given** a frase reduzida, **When** lida, **Then** continua legível (AA) e coerente com o tom.

---

### User Story 2 - Link oficial de agendamento (Priority: P1)

Ao clicar em qualquer botão de **agendamento** da home, a pessoa é levada ao canal oficial de
marcação (`https://corpora.bio/2d251bdb0e`), em nova aba, em vez do WhatsApp genérico. Há também
uma **área de contato dedicada** com WhatsApp, e-mail e Instagram para quem prefere falar direto.

**Why this priority**: Sem o destino correto, o CTA principal não cumpre a função. Crítico para
conversão real.

**Independent Test**: Clicar em cada botão "Agendar" e confirmar que abre `corpora.bio/2d251bdb0e`
em nova aba; confirmar que a seção de contato lista WhatsApp, e-mail e Instagram como links.

**Acceptance Scenarios**:

1. **Given** o botão "Agendar sua primeira conversa" (hero), **When** clicado, **Then** abre
   `https://corpora.bio/2d251bdb0e` em nova aba com `rel="noopener"`.
2. **Given** os demais botões de agendamento (nav e CTA final), **When** clicados, **Then**
   também abrem o link oficial de agendamento.
3. **Given** a seção de contato, **When** exibida, **Then** apresenta WhatsApp, e-mail e Instagram
   como canais clicáveis distintos do botão de agendamento.

---

### User Story 3 - Foto de atmosfera no bloco introdutório (Priority: P2)

No bloco "Existem momentos em que sentimos que repetimos os mesmos caminhos…", uma foto de
atmosfera (cena de mesa/escritório sereno) preenche o bloco como fundo full-bleed, com um **fade
espelhado** em relação ao hero: o **foco da imagem fica à esquerda** e a imagem **dissolve à
direita** no fundo creme, sem corte duro. O texto permanece legível (AA) sobre a área clara.

**Why this priority**: Reforça a identidade acolhedora e a continuidade visual com o hero, mas o
texto já funciona sem a foto (por isso P2).

**Independent Test**: Abrir a home, rolar até o bloco introdutório e confirmar a foto cobrindo o
bloco, foco à esquerda, fade dissolvendo à direita no creme, texto legível de 320px a 1440px+.

**Acceptance Scenarios**:

1. **Given** o bloco introdutório no desktop, **When** exibido, **Then** a foto cobre o bloco com
   o foco à esquerda e se dissolve no creme à direita (sem borda dura).
2. **Given** qualquer largura de 320–1440px+, **When** exibido, **Then** o texto mantém contraste
   AA sobre a foto/overlay e não há scroll horizontal.
3. **Given** a imagem indisponível, **When** o bloco renderiza, **Then** um fundo creme de
   fallback preserva a legibilidade do texto.

---

### User Story 4 - FAQ "Aceita convênio?" atualizado (Priority: P2)

Quem lê o FAQ vê, na pergunta "Aceita convênio?", a resposta atualizada: "Não, mas tenho horários
específicos para atendimento social. Consulte a agenda." — tanto no texto visível quanto nos
dados estruturados (JSON-LD) para consistência de SEO.

**Why this priority**: Corrige informação de negócio; simples, mas relevante para expectativa do
cliente.

**Independent Test**: Abrir o FAQ, expandir "Aceita convênio?" e confirmar a nova resposta;
inspecionar o JSON-LD e confirmar o mesmo texto.

**Acceptance Scenarios**:

1. **Given** o item de FAQ "Aceita convênio?", **When** expandido, **Then** exibe exatamente a
   nova resposta.
2. **Given** o JSON-LD (FAQPage) da página, **When** inspecionado, **Then** o `acceptedAnswer`
   dessa pergunta contém o mesmo texto da resposta visível.

### Edge Cases

- **Alturas de viewport curtas** (ex.: laptops 1366×768, mobile landscape): a frase reduzida do
  hero ainda deve permitir ver o CTA primário sem scroll.
- **Foto do intro com regiões claras/escuras sob o texto**: legibilidade não pode depender do
  conteúdo da foto — o overlay/fade garante base clara para AA.
- **320px** no bloco intro: o texto não pode cair sobre a parte "cheia" da foto sem overlay.
- **Link de agendamento indisponível**: fora do escopo garantir o destino externo; a página só
  precisa apontar corretamente para a URL informada.
- **Zoom 200% / alto contraste**: texto do hero e do intro permanecem legíveis e sem overflow.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A frase do hero DEVE ser reduzida (tamanho/escala tipográfica) de modo que, no
  desktop (~768px de altura) e no mobile, o botão primário do hero fique visível **sem rolar**,
  preservando legibilidade AA e o conteúdo textual da frase.
- **FR-002**: Os botões de **agendamento** da home (nav "Agendar", hero "Agendar sua primeira
  conversa" e CTA final "Agendar atendimento") DEVEM apontar para `https://corpora.bio/2d251bdb0e`,
  abrindo em nova aba com `rel="noopener"`.
- **FR-003**: DEVE existir uma **seção/área de contato dedicada** contendo WhatsApp, e-mail e
  Instagram como canais clicáveis, distinta dos botões de agendamento. Os valores atuais
  (placeholders) DEVEM ser mantidos até a cliente fornecer os reais.
- **FR-004**: O bloco introdutório "Existem momentos…" DEVE receber uma **foto de atmosfera
  full-bleed** (`capa_gigi_2.png`) como fundo, com **fade/gradiente espelhado** ao do hero: foco
  da imagem à esquerda e dissolução no fundo creme à direita, sem corte duro.
- **FR-005**: O texto do bloco introdutório DEVE manter contraste **WCAG 2.1 AA** sobre a foto em
  qualquer largura (320–1440px+), garantido pelo overlay/fade, não pelo conteúdo da foto.
- **FR-006**: A resposta do FAQ "Aceita convênio?" DEVE ser alterada para "Não, mas tenho horários
  específicos para atendimento social. Consulte a agenda." tanto no **texto visível** quanto no
  **JSON-LD** (FAQPage) da página.
- **FR-007**: As mudanças DEVEM permanecer **sem scroll horizontal** de 320px a 1440px+ e manter
  **um único `<h1>`** na página.
- **FR-008**: A foto do intro DEVE ser **decorativa** (`alt=""`) e ter **fallback de cor** (creme)
  caso a imagem falhe; nenhuma informação essencial depende dela.
- **FR-009**: A imagem `capa_gigi_2.png` DEVE ser servida **otimizada** (WebP com fallback,
  dimensões explícitas para evitar layout shift) e não pode degradar a performance da página.
- **FR-010**: Alterações DEVEM ficar **restritas à home** (`src/index.html`) e ao CSS
  (`styles.css` + bloco crítico inline); nenhuma outra página/seção pode ser afetada.

### Key Entities

- **Frase do hero**: texto de abertura; seu tamanho controla a altura da primeira dobra.
- **Link oficial de agendamento**: URL única (`corpora.bio/2d251bdb0e`) destino de todos os CTAs
  de agendamento.
- **Área de contato**: conjunto de canais (WhatsApp, e-mail, Instagram) para contato direto.
- **Foto de atmosfera do intro**: imagem decorativa full-bleed com fade espelhado; papel
  atmosférico (sem informação essencial).
- **Item de FAQ "Aceita convênio?"**: par pergunta/resposta refletido no texto visível e no JSON-LD.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em desktop (~1366×768) e mobile (~390×844), **100%** dos carregamentos mostram o
  botão primário do hero sem scroll (0 rolagem necessária para vê-lo).
- **SC-002**: **100%** dos botões de agendamento da home levam a `https://corpora.bio/2d251bdb0e`.
- **SC-003**: De 320px a 1440px+, o texto do bloco introdutório mantém contraste **AA** (≥ 4,5:1
  normal / ≥ 3:1 grande) sobre a foto.
- **SC-004**: **0** ocorrências de scroll horizontal entre 320px e 1440px+; **1** único `<h1>`.
- **SC-005**: A resposta visível do FAQ "Aceita convênio?" e o texto no JSON-LD são **idênticos**
  à nova resposta.
- **SC-006**: Performance permanece **≥ 95** (Lighthouse/PSI, mobile e desktop); a foto do intro
  não degrada o LCP nem gera CLS.
- **SC-007**: Com a imagem do intro indisponível, **100%** do texto do bloco permanece legível.

## Assumptions

- A imagem `capa_gigi_2.png` (cena de mesa/escritório, 2248×1888) já foi fornecida pela cliente e
  será adicionada aos assets do site, otimizada (crop + WebP + fallback JPG).
- "Botões de agendamento" abrange os três CTAs de agendar da home (nav, hero, CTA final); os
  canais WhatsApp/e-mail/Instagram da área de contato permanecem como canais de contato (o
  WhatsApp de contato segue sendo `wa.me`, não o link de agendamento).
- Os dados de contato (número, e-mail, @) seguem como **placeholders** até a cliente fornecer os
  reais; a estrutura fica pronta para a troca.
- O fade do intro reutiliza a mesma técnica de gradiente do hero (feature 004), apenas espelhada
  horizontalmente; paleta/tipografia inalteradas.
- Escopo restrito à home (`src/index.html`) e ao CSS (`styles.css` + bloco crítico inline).
