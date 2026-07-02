# Feature Specification: Painel de administração do blog (CMS)

**Feature Branch**: `feat/cms-blog-decap`

**Created**: 2026-07-02

**Status**: Draft (aguardando clarificações + aprovação)

**Input**: User description: "Painel de administração do blog para que uma pessoa leiga em
programação possa criar, editar e excluir posts do 'Caderno Clínico' e enviar fotos, por
uma interface visual com login e botão de publicar — sem editar HTML. CMS git-based
integrado ao GitHub, site estático e gratuito."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Publicar um novo post pelo painel (Priority: P1)

A autora (leiga em programação) acessa um endereço de administração, faz login, escreve o
texto num editor visual (título, parágrafos, subtítulos, negrito), anexa uma ou mais fotos
arrastando, e clica em "Publicar". Em poucos minutos o post aparece no site, na listagem do
Caderno Clínico.

**Why this priority**: É o objetivo central da feature — permitir alimentar o blog sem
tocar em código. Entrega valor mesmo sem edição/exclusão.

**Independent Test**: Logar no painel, criar um post com foto e publicar; confirmar que ele
aparece na listagem `/reflexoes/` e abre corretamente, sem nenhuma edição manual de arquivo.

**Acceptance Scenarios**:

1. **Given** a autora autenticada no painel, **When** ela preenche título, conteúdo e foto e
   clica em "Publicar", **Then** o post é publicado e fica visível no site sem intervenção técnica.
2. **Given** um rascunho, **When** ela salva sem publicar, **Then** o conteúdo não aparece no
   site público até ser publicado.

---

### User Story 2 - Editar um post existente (Priority: P2)

A autora abre um post já publicado no painel, corrige texto ou troca a foto e salva; a
alteração reflete no site.

**Acceptance Scenarios**:

1. **Given** um post publicado, **When** a autora edita e salva pelo painel, **Then** a versão
   publicada é atualizada, preservando a URL/endereço do post.

---

### User Story 3 - Excluir um post (Priority: P2)

A autora remove um post pelo painel; ele deixa de aparecer na listagem e na home.

**Acceptance Scenarios**:

1. **Given** um post publicado, **When** a autora o exclui pelo painel, **Then** ele some da
   listagem, da home e do mapa do site, sem editar arquivos manualmente.

---

### User Story 4 - Acesso restrito e seguro (Priority: P1)

Apenas pessoas autorizadas conseguem acessar o painel e publicar; visitantes comuns não têm
acesso à administração.

**Why this priority**: Sem controle de acesso, qualquer pessoa poderia alterar o site.

**Acceptance Scenarios**:

1. **Given** uma pessoa sem autorização, **When** tenta acessar o painel, **Then** o acesso é
   negado (login obrigatório).
2. **Given** a autora autorizada, **When** faz login, **Then** consegue gerenciar os posts.

### Edge Cases

- **Post sem foto**: deve publicar normalmente (foto é opcional).
- **Imagem muito grande**: o sistema deve aceitar, mas orientar/otimizar para não pesar o site.
- **Conexão cai ao publicar**: a autora não deve perder o texto escrito (rascunho preservado).
- **Site público continua funcionando** mesmo que o painel esteja indisponível (o painel é
  ferramenta de edição, não parte do site público).
- **Caracteres/acentos e nomes de arquivo**: o endereço (URL) do post é gerado automaticamente
  a partir do título, sem a autora precisar pensar em nomes de arquivo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A autora DEVE conseguir **criar** um post (título, data, resumo, conteúdo
  formatado e fotos) por uma interface visual, sem editar HTML.
- **FR-002**: A autora DEVE conseguir **editar** e **excluir** posts pela mesma interface.
- **FR-003**: A autora DEVE conseguir **enviar imagens** (capa e/ou no meio do texto) pela
  interface, sem manipular arquivos manualmente.
- **FR-004**: Publicar/editar/excluir DEVE **atualizar o site** (listagem, home e mapa do site)
  automaticamente, sem passos técnicos manuais.
- **FR-005**: O painel DEVE exigir **login**; apenas pessoas autorizadas publicam.
- **FR-006**: O endereço (URL) e a estrutura de SEO de cada post (title/description/JSON-LD)
  DEVEM ser gerados automaticamente, mantendo o padrão atual do site.
- **FR-007**: O site público DEVE permanecer **estático, gratuito e sem regressão** de
  performance, acessibilidade e identidade visual já existentes.
- **FR-008**: O processo DEVE preservar o **histórico de versões** dos posts (poder reverter).
- **FR-009**: A experiência DEVE ser em **português** e compreensível para pessoa leiga
  (rótulos claros, sem jargão técnico).

### Key Entities

- **Post**: título, data de publicação, resumo, conteúdo (texto formatado), foto de capa
  (opcional), imagens no corpo (opcionais), estado (rascunho/publicado), endereço (URL).
- **Autora/Usuário**: identidade autorizada a acessar o painel (login).
- **Imagem**: arquivo enviado pela autora, associado a um post.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Uma pessoa **sem conhecimento de programação** consegue publicar um post
  completo (com foto) em **menos de 10 minutos**, sem abrir nenhum arquivo de código.
- **SC-002**: Criar, editar e excluir posts é feito **100% pela interface**, sem edição manual
  de HTML, listagem ou mapa do site.
- **SC-003**: O custo de hospedagem/ferramentas permanece **R$ 0** (site estático + serviços
  gratuitos).
- **SC-004**: Nenhuma **regressão** nas metas atuais (Lighthouse, acessibilidade AA, identidade
  visual) do site público.
- **SC-005**: Apenas usuários autorizados publicam (0 acesso anônimo de escrita).

## Assumptions

- **Autoria única/pequena**: inicialmente apenas Giovanna publica (pode crescer).
- **Git-based CMS**: o conteúdo continua versionado no repositório GitHub (histórico/reversão).
- **Gratuito**: usar apenas camadas gratuitas (GitHub, e serviço de login/CMS sem custo).
- O site já está publicado no GitHub Pages (subpath) e também há deploy no Netlify.

## Decisões técnicas (resolvidas)

- **Modelo de conteúdo:** posts passam a ser **Markdown** e um **gerador estático leve
  (Eleventy)** monta as páginas no padrão atual do site, via **GitHub Actions**. Adota-se
  uma etapa de **build** (output continua estático/gratuito no GitHub Pages). **Requer
  emenda à constituição** (que hoje pede "zero build") — aprovado pela pessoa usuária.
- **CMS + autenticação:** **Sveltia CMS** com **login via GitHub** (git-based, gratuito,
  moderno). Requer: um **GitHub OAuth App** e um **handler de OAuth** gratuito
  (ex.: Cloudflare Worker `sveltia-cms-auth`). Quem publica precisa de conta GitHub com
  acesso de escrita ao repositório.
