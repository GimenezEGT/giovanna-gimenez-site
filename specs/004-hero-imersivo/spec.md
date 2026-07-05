# Feature Specification: Hero imersivo (foto full-bleed com fade)

**Feature Branch**: `feat/004-hero-imersivo`

**Created**: 2026-07-04

**Status**: Draft (aguardando aprovação para planejar/implementar)

**Input**: User description: "Mudar o efeito da primeira foto do site para um fade com o fundo,
com a foto ocupando todo o primeiro bloco (onde está o texto do hero). Exemplo anexo é
referência do efeito; no site usar a foto que já está lá."

> Builds sobre a feature [001](../001-site-institucional-blog/spec.md) (home) e a identidade
> visual oficial. Não muda paleta, tipografia nem outras seções — apenas o **layout e o
> acabamento da primeira dobra (hero)**.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Primeira dobra imersiva (Priority: P1) 🎯 MVP

Ao chegar no site, a pessoa vê a foto de atmosfera **preenchendo todo o bloco do hero** como
fundo, com um **fade** que dissolve a imagem no fundo creme do site e mantém a área do texto
clara. O texto do hero (frase, nome, subtítulo, apoio e CTAs) aparece **sobreposto** à foto,
na porção esquerda, sereno e legível — transmitindo acolhimento logo de cara.

**Why this priority**: É o pedido central e o que mais afeta a primeira impressão/conversão.
Entrega valor por si só.

**Independent Test**: Abrir a home no desktop e confirmar que a foto ocupa toda a largura do
hero, com fade suave (sem borda dura) e o texto legível sobre ela.

**Acceptance Scenarios**:

1. **Given** a home no desktop, **When** a primeira dobra carrega, **Then** a foto ocupa 100%
   da largura do bloco do hero e se funde ao fundo por um gradiente (sem corte duro).
2. **Given** o texto do hero sobre a foto, **When** a pessoa lê, **Then** o contraste é
   confortável (AA) e nenhum trecho fica ilegível sobre partes "cheias" da imagem.

---

### User Story 2 - Legibilidade responsiva (Priority: P2)

O efeito se adapta de 320px a 1440px+: em telas estreitas a foto vira fundo com fade
suficiente para o texto continuar legível; em telas largas a foto cobre tudo sem distorcer
nem deixar faixa vazia. Em nenhuma largura surge scroll horizontal.

**Why this priority**: Sem isso, o hero imersivo quebra no mobile (onde está a maioria dos
acessos). Secundário só porque depende da US1 existir.

**Independent Test**: Redimensionar de 320px a 1440px+ e confirmar texto legível (AA), foto
cobrindo o hero e ausência de scroll horizontal em todas as larguras.

**Acceptance Scenarios**:

1. **Given** um celular (320–420px), **When** a home carrega, **Then** o texto do hero fica
   sobre uma área com fade/overlay clara o bastante para manter contraste AA.
2. **Given** qualquer largura de 320–1440px+, **When** a página é exibida, **Then** não há
   scroll horizontal e a foto não distorce.

---

### User Story 3 - Degradação graciosa e movimento respeitoso (Priority: P3)

Se a imagem não carregar (ou sem suporte a algum recurso), o hero mantém um fundo de cor que
preserva a legibilidade do texto. Sob `prefers-reduced-motion`, não há qualquer animação/
parallax essencial.

**Why this priority**: Robustez e acessibilidade; agrega confiabilidade sem bloquear o visual.

**Acceptance Scenarios**:

1. **Given** a imagem indisponível, **When** o hero renderiza, **Then** um fundo de cor de
   fallback mantém o texto legível (nada depende exclusivamente da foto).
2. **Given** `prefers-reduced-motion: reduce`, **When** a página carrega/rola, **Then** não há
   movimento essencial no hero.

### Edge Cases

- **Foto com regiões claras/escuras sob o texto**: a legibilidade não pode depender do
  conteúdo da imagem — o fade/overlay garante base clara suficiente para AA sob todo o texto.
- **320px**: o texto não pode cair sobre a parte "cheia"/detalhada da foto sem overlay.
- **>1440px / telas muito largas**: a foto cobre full-bleed sem distorção nem faixa vazia.
- **Sem JS ou imagem falha**: fundo de cor de fallback preserva o texto.
- **Zoom 200% / alto contraste**: texto permanece legível e sem overflow.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A foto atual do hero DEVE ocupar **todo o bloco do hero** como fundo full-bleed,
  substituindo o layout atual de imagem lateral.
- **FR-002**: DEVE existir um efeito de **fade/gradiente** que (a) mantém a área do texto clara
  o suficiente para legibilidade e (b) dissolve as bordas da foto no fundo creme, sem cortes
  duros.
- **FR-003**: O conteúdo textual do hero (frase principal, nome, subtítulo, apoio e os dois
  CTAs) DEVE ficar **sobreposto** à foto, preservando o mesmo conteúdo, ordem e marcadores
  editáveis existentes.
- **FR-004**: O contraste texto/fundo sob todo o texto do hero DEVE atender **WCAG 2.1 AA** em
  qualquer largura — garantido pelo fade/overlay, não pelo conteúdo da foto.
- **FR-005**: O hero DEVE ser responsivo de **320px a 1440px+** sem **scroll horizontal**; no
  mobile a foto vira fundo com fade suficiente para o texto seguir legível.
- **FR-006**: DEVE **reusar a foto que já existe** no site (`giovanna-hero.jpg/.webp`), sem
  adicionar peso significativo; manter formato otimizado (WebP com fallback) e dimensões
  explícitas para evitar layout shift.
- **FR-007**: `prefers-reduced-motion: reduce` DEVE ser respeitado (sem animação/parallax
  essencial no hero).
- **FR-008**: DEVE haver **um único `<h1>`** na página; os CTAs DEVEM permanecer operáveis por
  teclado com **foco visível**.
- **FR-009**: Se a imagem falhar/estiver indisponível, o hero DEVE manter um **fundo de cor de
  fallback** que preserve a legibilidade do texto.
- **FR-010**: Alterações DEVEM ficar **restritas à seção hero** da home (`src/index.html`) e ao
  CSS (`styles.css` + bloco crítico inline); nenhuma outra seção pode ser afetada.

### Key Entities

- **Foto de fundo do hero**: imagem de atmosfera já existente, exibida full-bleed atrás do
  texto; papel atmosférico/decorativo (não carrega informação essencial).
- **Camada de fade/overlay**: gradiente(s) que garante legibilidade sob o texto e a dissolução
  suave das bordas no fundo.
- **Conteúdo do hero**: frase, nome, subtítulo, apoio e CTAs — a fonte de toda a informação.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: De 320px a 1440px+, o texto do hero mantém contraste **AA** (≥ 4,5:1 normal /
  ≥ 3:1 grande) sobre a foto.
- **SC-002**: **0** ocorrências de scroll horizontal entre 320px e 1440px+.
- **SC-003**: Performance permanece **≥ 95** (Lighthouse/PSI, mobile e desktop) — a nova
  primeira dobra não degrada o LCP.
- **SC-004**: A foto ocupa **100%** da largura do bloco do hero e se dissolve no fundo sem
  borda dura perceptível.
- **SC-005**: Com a imagem indisponível ou sem JS, **100%** do texto do hero permanece legível.
- **SC-006**: **1** único `<h1>`; CTAs operáveis por teclado com foco visível; **0** erros de
  console.

## Assumptions

- Reuso da foto atual do hero (`giovanna-hero.jpg/.webp`); nenhuma imagem nova é adicionada.
- A foto é **atmosférica/decorativa** — pode servir como fundo; todo o significado está no
  texto do hero.
- A altura do hero permanece **content-driven** (não é obrigatório virar full-viewport).
- Paleta, tipografia e constituição permanecem inalteradas; muda apenas o layout/efeito do hero.
- Escopo restrito à seção hero da home (`src/index.html`) e ao CSS (`styles.css` + crítico).
- A imagem enviada pelo usuário é **apenas referência do efeito**, não substitui a foto do site.
