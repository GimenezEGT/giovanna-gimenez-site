# Feature Specification: Migração de domínio (site-raiz) + Google Analytics

**Feature Branch**: `feat/006-dominio-analytics`

**Created**: 2026-07-08

**Status**: Draft

**Input**: User description: "Preparar o site para hospedagem na conta da própria cliente
(giovannapsicanalista.github.io, site-raiz) migrando a URL base de projeto-subpath para raiz, e
instalar Google Analytics (GA4 G-EPFLCGTMPV) em todas as páginas, sem mudar layout/conteúdo."

> Builds sobre as features anteriores (site institucional + blog). Não muda layout, paleta,
> tipografia nem conteúdo visível — apenas **metadados/URLs de SEO**, **config do CMS** e
> adiciona o **script de analytics**.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Site correto no domínio da cliente (Priority: P1) 🎯 MVP

O site é publicado na conta da própria cliente e servido na **raiz** `https://giovannapsicanalista.github.io/`.
Todas as URLs "canônicas" de SEO (canonical, Open Graph, Twitter card, JSON-LD, sitemap, robots)
apontam para o domínio novo e para a **raiz** (sem o subpath `/giovanna-gimenez-site/`), de modo
que mecanismos de busca e compartilhamento em redes sociais mostram o endereço certo.

**Why this priority**: Sem o domínio/URLs corretos, o site publicado teria metadados apontando
para o endereço antigo (errado), quebrando SEO, prévia de links e o sitemap. É a base da entrega.

**Independent Test**: Publicar (ou servir o build) e conferir que `canonical`, `og:url`,
`og:image`, `twitter:image`, o JSON-LD e o `sitemap.xml`/`robots.txt` contêm
`https://giovannapsicanalista.github.io/...` (raiz), e que a navegação e os assets carregam sem erro.

**Acceptance Scenarios**:

1. **Given** a home publicada na raiz, **When** inspeciono o `<head>`, **Then** `canonical` e
   `og:url` são `https://giovannapsicanalista.github.io/` (sem subpath).
2. **Given** o blog (listagem e um post), **When** inspeciono canonical/OG, **Then** apontam para
   `https://giovannapsicanalista.github.io/reflexoes/...` (gerados a partir da URL base única).
3. **Given** `sitemap.xml` e `robots.txt`, **When** abertos, **Then** todas as URLs usam o domínio
   novo na raiz.
4. **Given** qualquer página, **When** navego pelos links internos e assets (CSS, imagens, logo),
   **Then** tudo carrega na raiz sem link quebrado (navegação/assets são relativos).

---

### User Story 2 - Medição de acessos com Google Analytics (Priority: P1)

A cliente consegue acompanhar visitas no painel do Google Analytics (propriedade GA4
`G-EPFLCGTMPV`), porque todas as páginas do site (home, listagem do blog, posts e a página 404)
carregam o script de medição — sem prejudicar a performance.

**Why this priority**: É o objetivo explícito do pedido (analytics). Independente da migração de
domínio, entrega valor por si.

**Independent Test**: Abrir cada tipo de página e confirmar que o script do GA4 (`G-EPFLCGTMPV`)
é carregado e dispara o page_view; confirmar que o carregamento é assíncrono (não bloqueia render).

**Acceptance Scenarios**:

1. **Given** a home, a listagem do blog, um post e a 404, **When** carregam, **Then** o script do
   GA4 com o ID `G-EPFLCGTMPV` está presente no `<head>` e inicializa.
2. **Given** o script de analytics, **When** a página carrega, **Then** ele é **assíncrono** e não
   bloqueia a renderização (performance preservada).
3. **Given** o painel do GA4, **When** há uma visita, **Then** um evento de visualização de página
   é registrado.

---

### User Story 3 - Edição de posts pela cliente (CMS) no novo repositório (Priority: P3)

Se a cliente usar o painel `/admin/`, ele aponta para o **repositório dela**
(`giovannapsicanalista/giovannapsicanalista.github.io`) e as imagens enviadas resolvem para a **raiz**
(`/assets/images/posts`), não para o subpath antigo.

**Why this priority**: Só importa se/quando o CMS for usado; a publicação do site não depende
disso. A infraestrutura de login (OAuth) é um passo à parte, fora do código.

**Acceptance Scenarios**:

1. **Given** `src/admin/config.yml`, **When** inspecionado, **Then** `repo` é
   `giovannapsicanalista/giovannapsicanalista.github.io` e `public_folder` é `/assets/images/posts`.

### Edge Cases

- **Prévia de link social** (WhatsApp/Facebook): a `og:image` precisa ser uma URL absoluta válida
  no domínio novo, senão a prévia quebra.
- **Sitemap com URL antiga**: buscadores indexariam o endereço errado — todas as URLs do sitemap
  devem usar o domínio novo.
- **404 servida pelo Pages**: precisa continuar funcionando na raiz (assets/links não podem
  depender do subpath antigo).
- **Bloqueio de JS / falha do Google**: o site deve continuar 100% funcional sem o analytics
  (script não essencial; nada de layout depende dele).
- **Performance**: o script de terceiros não pode derrubar Lighthouse < 95.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A URL base do site DEVE ser `https://giovannapsicanalista.github.io` (site-raiz, sem o
  subpath `/giovanna-gimenez-site/`), refletida na fonte única de URL do site.
- **FR-002**: Todas as URLs absolutas de SEO/metadados da **home** (canonical, `og:url`,
  `og:image`, `twitter:image`, JSON-LD `url`/`image`) DEVEM usar o domínio novo na raiz.
- **FR-003**: As URLs de SEO do **blog** (listagem e posts: canonical/OG) e do **`sitemap.xml`**
  DEVEM ser geradas a partir da URL base única, apontando para o domínio novo na raiz.
- **FR-004**: O `robots.txt` DEVE referenciar o `sitemap.xml` no domínio novo.
- **FR-005**: A página **404** DEVE funcionar na raiz — seus links/assets não podem depender do
  subpath antigo (usar o domínio novo ou caminhos relativos).
- **FR-006**: A navegação interna e os assets (CSS, imagens, logo, fontes) DEVEM continuar
  funcionando na raiz sem link quebrado (já são relativos; não podem regredir).
- **FR-007**: O CMS (`src/admin/config.yml`) DEVE apontar `repo` para
  `giovannapsicanalista/giovannapsicanalista.github.io` e `public_folder` para `/assets/images/posts`.
- **FR-008**: TODAS as páginas do site (home, listagem do blog, cada post, 404) DEVEM carregar o
  script do Google Analytics GA4 com o Measurement ID `G-EPFLCGTMPV`.
- **FR-009**: O script de analytics DEVE ser carregado de forma **assíncrona**, sem bloquear a
  renderização, preservando a meta de performance.
- **FR-010**: O site DEVE permanecer **100% funcional sem o analytics** (JS bloqueado ou Google
  indisponível) — nada visual/essencial depende do script.
- **FR-011**: Nenhuma mudança de **layout, paleta, tipografia ou conteúdo visível** pode ocorrer;
  o escopo é metadados/URLs, config do CMS e o snippet de analytics.

### Key Entities

- **URL base do site**: endereço canônico único (`https://giovannapsicanalista.github.io`) do qual
  derivam sitemap, canonical e Open Graph do blog.
- **Metadados de SEO da home**: conjunto de URLs absolutas hardcoded na home estática.
- **Config do CMS**: repositório-alvo e pasta pública de mídia do painel de edição.
- **Tag de analytics (GA4)**: script de medição identificado por `G-EPFLCGTMPV`, presente em todas
  as páginas.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: **100%** das URLs de SEO/metadados (home, blog, sitemap, robots) usam
  `https://giovannapsicanalista.github.io` na raiz; **0** ocorrências do domínio/subpath antigo em
  arquivos servidos.
- **SC-002**: **100%** dos tipos de página (home, listagem, post, 404) carregam o GA4
  `G-EPFLCGTMPV`.
- **SC-003**: Performance permanece **≥ 95** (Lighthouse/PSI, mobile e desktop) com o analytics
  instalado.
- **SC-004**: Com JS bloqueado, **100%** do conteúdo e da navegação do site continuam funcionais.
- **SC-005**: **0** links internos/assets quebrados na raiz (home, blog, 404).
- **SC-006**: O `config.yml` do CMS referencia o repositório e a pasta pública corretos (raiz).

## Assumptions

- O repositório na conta da cliente se chamará exatamente `giovannapsicanalista.github.io`
  (site-raiz de usuária), servido em `https://giovannapsicanalista.github.io/`.
- Navegação e assets já usam caminhos relativos (`assets/…`, `{{ root }}` = `../`) e funcionam na
  raiz sem alteração — apenas as URLs absolutas de SEO precisam mudar.
- O workflow de deploy (`.github/workflows/deploy.yml`) é genérico (usa `GITHUB_TOKEN`, publica
  `_site`) e **não** precisa de alteração de código; o Source do Pages deve ser "GitHub Actions".
- O login OAuth do CMS (Cloudflare Worker + GitHub OAuth App) é **infraestrutura fora do código**
  e será reconfigurado à parte; esta feature só ajusta o `config.yml`.
- Consentimento de cookies (LGPD) não está no escopo desta feature (instalação básica da tag);
  pode ser tratado depois se desejado.
- O Measurement ID `G-EPFLCGTMPV` é válido e pertence à conta de Analytics da cliente.
