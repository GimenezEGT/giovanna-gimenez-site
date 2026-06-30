# Feature Specification: Refinamento visual e de conteúdo

**Feature Branch**: `002-refinamento-visual-conteudo`

**Created**: 2026-06-30

**Status**: Draft (aguardando aprovação para implementar)

**Input**: User description: "Feature de refinamento visual/conteúdo — polir a estética do
site (mais editorial e acolhedor), adicionar movimento sutil, melhorar os placeholders de
imagem e revisar pequenos textos, sem regressões de acessibilidade/performance."

> Builds sobre a feature [001](../001-site-institucional-blog/spec.md). Não muda a estrutura
> nem a paleta/tipografia fixadas na constituição — apenas refina o acabamento.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Estética mais editorial e acolhedora (Priority: P1)

Ao chegar no site, a pessoa percebe um acabamento mais sofisticado e sereno: acentos
decorativos delicados (traços/folhas), divisores sutis entre seções, hero com uma forma
suave de fundo, e estados de hover/foco mais refinados em cards e botões.

**Why this priority**: É o coração do pedido — elevar a percepção de cuidado e
profissionalismo, reforçando a conversão. Entrega valor mesmo sem as demais histórias.

**Independent Test**: Comparar o antes/depois da home; verificar que os acentos decorativos
aparecem, que o contraste AA se mantém e que não há scroll horizontal de 320–1440px+.

**Acceptance Scenarios**:

1. **Given** a home, **When** a pessoa percorre as seções, **Then** vê acabamento editorial
   (acentos, divisores, profundidade sutil) sem que a leitura ou o contraste piorem.
2. **Given** cards e botões, **When** a pessoa passa o mouse/teclado, **Then** há retorno
   visual sutil e foco visível mantido.

---

### User Story 2 - Movimento sutil e respeitoso (Priority: P2)

Elementos surgem com uma animação discreta de revelação ao rolar (fade/sobe levemente),
transmitindo calma — e desligada por completo para quem prefere menos movimento.

**Why this priority**: Adiciona vida sem comprometer sobriedade/acessibilidade. Secundário
ao acabamento estático.

**Independent Test**: Rolar a página e ver as revelações; ativar `prefers-reduced-motion` e
confirmar que tudo aparece imediatamente, sem animação.

**Acceptance Scenarios**:

1. **Given** rolagem normal, **When** uma seção entra na viewport, **Then** ela revela com
   transição curta e suave.
2. **Given** `prefers-reduced-motion: reduce`, **When** a página carrega/rola, **Then**
   nenhum conteúdo depende de animação para ficar visível.
3. **Given** JavaScript desabilitado, **When** a página carrega, **Then** todo o conteúdo
   permanece visível (sem ficar "preso" invisível).

---

### User Story 3 - Placeholders ilustrados (Priority: P3)

Enquanto as fotos reais não chegam, os placeholders deixam de ser blocos de cor chapados e
passam a ser ilustrações SVG suaves e temáticas (planta, janela com luz, xícara/caderno),
coerentes com a estética — ficando apresentável para mostrar à cliente.

**Why this priority**: Melhora a demonstração e a percepção de qualidade no intervalo até as
fotos reais. Não bloqueia nada.

**Independent Test**: Abrir home/sobre e ver ilustrações agradáveis no lugar dos blocos;
confirmar que a troca pelas fotos reais (mesmos nomes/`<picture>`) continua trivial.

**Acceptance Scenarios**:

1. **Given** a ausência de fotos reais, **When** a home/sobre carregam, **Then** exibem
   ilustrações SVG temáticas com `alt` adequado.
2. **Given** que a cliente forneça as fotos, **When** ela as adiciona com os nomes
   documentados, **Then** o site usa as fotos sem alteração de código.

---

### User Story 4 - Pequenos ajustes de conteúdo (Priority: P3)

Revisão leve de microcopy (subtítulos de seção, rótulos de CTA, frases de apoio) para
fluidez e tom, **preservando** todos os placeholders editáveis e seus marcadores.

**Why this priority**: Refino fino; agrega polimento sem reescrever conteúdo.

**Acceptance Scenarios**:

1. **Given** os marcadores de placeholder, **When** a copy é ajustada, **Then** os
   comentários/delimitadores e a editabilidade permanecem intactos.

### Edge Cases

- **Sem JS**: revelações não podem esconder conteúdo (estado padrão = visível).
- **`prefers-reduced-motion`**: zero animação essencial.
- **Telas pequenas**: acentos decorativos não causam overflow/scroll horizontal.
- **Contraste**: acentos/decorações não reduzem contraste de texto abaixo de AA.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A home DEVE ganhar acentos decorativos delicados (SVG) e divisores sutis entre
  seções, sem alterar a ordem das seções nem a paleta/tipografia da constituição.
- **FR-002**: Cards e botões DEVEM ter estados de hover/foco refinados, mantendo foco visível.
- **FR-003**: O site DEVE ter animação de revelação ao rolar, curta e sutil, via JS
  progressivo (IntersectionObserver), com fallback de conteúdo visível sem JS.
- **FR-004**: Toda animação DEVE ser suprimida sob `prefers-reduced-motion: reduce`.
- **FR-005**: Os placeholders de imagem DEVEM ser substituídos por ilustrações SVG temáticas
  e leves, mantendo o `<picture>`/nomes para troca trivial pelas fotos reais.
- **FR-006**: Ajustes de microcopy DEVEM preservar todos os marcadores/delimitadores de
  conteúdo editável.
- **FR-007**: Nenhuma mudança PODE introduzir scroll horizontal (320–1440px+), erro de
  console, ou regressão de contraste AA, SEO ou semântica (1 `<h1>`/página).

### Key Entities

- **Acento decorativo**: SVG leve (traço/folha), `aria-hidden`, posicionado sem afetar fluxo.
- **Elemento revelável**: bloco marcado para animar na entrada da viewport.
- **Ilustração-placeholder**: SVG temático que ocupa o lugar de uma foto futura.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 ocorrências de scroll horizontal entre 320px e 1440px+ após o refino.
- **SC-002**: Com `prefers-reduced-motion`, 100% do conteúdo visível sem qualquer animação.
- **SC-003**: Sem JavaScript, 100% do conteúdo visível (nenhum elemento preso invisível).
- **SC-004**: Contraste AA mantido em todos os pares texto/fundo; 1 `<h1>` por página; 0 erros de console.
- **SC-005**: Metas de performance/SEO da feature 001 preservadas (sem novas dependências
  pesadas; JS adicional mínimo).

## Assumptions

- Mantêm-se paleta, tipografia e estrutura de seções (constituição inalterada).
- Ilustrações são placeholders temporários até as fotos reais da cliente.
- Movimento "sutil" = transições curtas (~300–500ms), pequena translação/opacidade.
- Sem bibliotecas de animação; apenas CSS + um observer vanilla.
