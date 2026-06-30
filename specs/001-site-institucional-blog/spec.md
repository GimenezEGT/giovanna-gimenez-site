# Feature Specification: Site institucional + blog "Reflexões"

**Feature Branch**: `001-site-institucional-blog`

**Created**: 2026-06-30

**Status**: Implemented (formalização retroativa via Spec Kit)

**Input**: User description: "Formalizar o site já construído (página única com âncoras +
blog Reflexões) como feature do spec-kit, gerar suas tasks e fechar as pendências."

> Esta spec captura, em linguagem de produto (o *quê* e o *porquê*), o site já
> implementado. O detalhamento técnico vive em [../specification.md](../specification.md)
> e [../plan.md](../plan.md). O objetivo imediato é gerar a lista de tasks e **fechar
> pendências** (WebP, auditoria de performance, substituição de placeholders).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitante entende e agenda (Priority: P1)

Uma pessoa (adolescente/adulto, ou um responsável) chega ao site buscando atendimento
psicanalítico online. Ela precisa, em poucos segundos, sentir acolhimento, entender quem é
a profissional, como funciona o atendimento e como falar com ela.

**Why this priority**: É o objetivo central do site — converter visitantes em contatos/
agendamentos. Sem isso, o site não cumpre sua função.

**Independent Test**: Abrir a home, ler hero → "como funciona" → "sobre" → "contato", e
acionar um CTA de agendamento (WhatsApp/e-mail). Entrega valor mesmo sem blog.

**Acceptance Scenarios**:

1. **Given** a home aberta em qualquer dispositivo (320–1440px+), **When** a pessoa percorre
   a página, **Then** vê identidade, proposta, "como funciona", "sobre", FAQ e contato sem
   scroll horizontal e com CTAs de agendamento visíveis e funcionais.
2. **Given** um leitor de tela ou navegação só por teclado, **When** a pessoa navega,
   **Then** consegue alcançar e operar menu, âncoras, FAQ e CTAs com foco visível.

---

### User Story 2 - Visitante lê as Reflexões e é descoberto via busca (Priority: P2)

A pessoa quer conhecer a forma de pensar da profissional antes de marcar; e novos
visitantes chegam organicamente pelo Google a partir dos textos do blog.

**Why this priority**: Constrói confiança e presença orgânica ao longo do tempo. Importante,
mas secundário à conversão direta.

**Independent Test**: Acessar `/reflexoes/`, abrir um post, ler até o CTA de agendamento;
validar metadados/SEO (title/description/canonical/JSON-LD) do post.

**Acceptance Scenarios**:

1. **Given** a seção Reflexões na home, **When** a pessoa clica em um card, **Then** chega
   ao post correspondente, com data, tempo de leitura, conteúdo e CTA final.
2. **Given** um post publicado, **When** um buscador o indexa, **Then** encontra title,
   description, canonical e JSON-LD `Article` válidos, e a URL está no `sitemap.xml`.

---

### User Story 3 - Dona do site edita conteúdo sem ajuda técnica (Priority: P3)

A psicanalista (ou alguém não-técnico) precisa trocar textos, dados de contato/CRP, fotos
e publicar novos posts sem editar lógica.

**Why this priority**: Garante sustentabilidade do site após a entrega. Não bloqueia o
lançamento, mas é essencial para manutenção.

**Independent Test**: Seguir o README para trocar um texto (placeholder comentado), trocar
uma foto (mesmo nome de arquivo) e criar um post a partir do template.

**Acceptance Scenarios**:

1. **Given** os placeholders comentados, **When** a pessoa edita o texto entre os
   comentários, **Then** o conteúdo muda sem quebrar o layout.
2. **Given** o `_template-post.html` e o README, **When** a pessoa cria um post e adiciona o
   card na listagem, **Then** o post fica acessível e linkado.

### Edge Cases

- **Sem JavaScript**: o site continua navegável (menu vira links empilhados; FAQ via
  `<details>`; ano do rodapé tem fallback no HTML).
- **Falha do Google Fonts**: textos renderizam com fontes de sistema (fallbacks).
- **Imagem ausente** (ex.: WebP não fornecido): `<picture>` cai no JPG.
- **Servido em subpath ou domínio próprio**: caminhos relativos funcionam nos dois casos.
- **`prefers-reduced-motion`**: animações são suprimidas.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A home DEVE apresentar, em ordem, cabeçalho/menu, hero, texto introdutório,
  "como funciona", "sobre", "áreas de atendimento", "Reflexões", FAQ, contato e rodapé.
- **FR-002**: O site DEVE oferecer CTAs de agendamento (WhatsApp/contato) recorrentes e
  acessíveis em todas as páginas.
- **FR-003**: O menu DEVE ser acessível por teclado, com versão mobile (hambúrguer) que
  abre/fecha por teclado e toque, fecha com `Esc` e gerencia foco.
- **FR-004**: O FAQ DEVE ser um accordion acessível operável por teclado.
- **FR-005**: O blog DEVE ter listagem (`/reflexoes/`) e ao menos 3 posts, cada um com
  título, data, tempo de leitura, conteúdo e CTA, em tom acolhedor e sem
  diagnóstico/promessa de cura.
- **FR-006**: Toda copy editável e estruturas repetíveis DEVEM estar marcadas/comentadas
  para edição por leigos; dados sensíveis (telefone, e-mail, Instagram, CRP, URL) DEVEM ser
  placeholders documentados no README.
- **FR-007**: Cada página DEVE ter title/description/canonical únicos, Open Graph/Twitter,
  um único `<h1>`, `lang="pt-BR"`, e JSON-LD apropriado (home: `ProfessionalService`+
  `Person` e `FAQPage`; posts: `Article`).
- **FR-008**: O projeto DEVE incluir `sitemap.xml`, `robots.txt`, favicon/ícones (monograma
  "G") e publicar via GitHub Pages sem etapa de build.
- **FR-009**: O site DEVE ser responsivo de 320px a 1440px+ sem scroll horizontal e
  respeitar contraste AA e `prefers-reduced-motion`.
- **FR-010**: As imagens DEVEM usar formato otimizado com fallback (WebP→JPG), lazy-load e
  dimensões explícitas. *(Pendência: gerar/entregar versões WebP das fotos.)*

### Key Entities *(include if feature involves data)*

- **Post de Reflexão**: título, slug/arquivo, data de publicação, tempo de leitura, resumo,
  conteúdo, CTA; aparece na listagem, (opcionalmente) na home, no `sitemap.xml`.
- **Bloco de conteúdo editável**: rótulo (ex.: `FRASE_HERO`), valor padrão, delimitadores
  de comentário.
- **Dado de contato**: tipo (WhatsApp/e-mail/Instagram/CRP/URL), valor placeholder.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A home comunica identidade e oferece um caminho de agendamento visível na
  primeira dobra em telas de 320px a 1440px+ (0 ocorrências de scroll horizontal).
- **SC-002**: 100% das funcionalidades interativas (menu, âncoras, FAQ, CTAs) são operáveis
  somente por teclado, com foco visível.
- **SC-003**: Lighthouse ≥ 95 em Performance, Acessibilidade, Práticas Recomendadas e SEO,
  medido após deploy com a URL real e imagens otimizadas.
- **SC-004**: 100% das páginas têm metadados únicos válidos e JSON-LD que passa em validador
  de dados estruturados; todas as URLs públicas constam do `sitemap.xml`.
- **SC-005**: Uma pessoa não-técnica consegue, seguindo o README, trocar um texto, uma foto
  e publicar um novo post sem editar CSS/JS.

## Assumptions

- Atendimento é **online**; não há endereço físico público (influencia o JSON-LD da home).
- Dados de contato e CRP permanecem como **placeholders** até a cliente fornecer os reais.
- Domínio próprio será definido depois; até lá a URL canônica é um placeholder
  (`https://SEU-USUARIO.github.io/SEU-REPO/`).
- Fonte padrão: Playfair Display + Lato (decisão registrada na constituição).
- Fotos reais (e versões WebP) serão fornecidas pela cliente; placeholders cobrem o intervalo.
