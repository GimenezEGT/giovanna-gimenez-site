# Specification — O *quê*

> Requisitos funcionais e de conteúdo, seção por seção, com **critérios de aceitação
> testáveis**. Subordinado à [constitution.md](./constitution.md).

## Convenções

- **Placeholders de copy:** delimitados por comentários HTML, ex.:
  `<!-- FRASE_HERO:início -->…<!-- FRASE_HERO:fim -->`. Valor padrão preenchido.
- **Placeholders de dado:** telefone `(11) 99999-9999`, e-mail
  `contato@giovannagimenez.com.br`, Instagram `@giovannagimenez.psicanalise`,
  CRP `CRP 00/00000`. Marcados para troca pela cliente.
- **Idioma:** `pt-BR`.

---

## Páginas do site

| Página              | Caminho                          | `<title>` (padrão, editável)                                   |
|---------------------|----------------------------------|----------------------------------------------------------------|
| Home                | `/index.html`                    | Giovanna Gimenez · Psicanálise Clínica — Atendimento online    |
| Listagem do blog    | `/reflexoes/index.html`          | Reflexões · Caderno Clínico — Giovanna Gimenez                 |
| Post 1 (ansiedade)  | `/reflexoes/posts/<slug>.html`   | (título do post) — Reflexões · Giovanna Gimenez                |
| Post 2 (autoestima) | `/reflexoes/posts/<slug>.html`   | idem                                                            |
| Post 3 (adolescência)| `/reflexoes/posts/<slug>.html`  | idem                                                            |

---

## HOME — seções (nesta ordem)

### 0. Cabeçalho / Menu

- Fixo no topo; fundo **translúcido com leve blur** ao rolar (sólido o suficiente p/ contraste AA).
- Logo textual à esquerda: **"Giovanna Gimenez · Psicanálise Clínica"**.
- Navegação: **Início · Sobre · Psicanálise · Reflexões · Perguntas Frequentes · Contato**.
- Botão **Agendar** em destaque (verde oliva).
- Mobile: **menu hambúrguer acessível** (botão com `aria-expanded`, operável por teclado,
  fechável com `Esc`, foco gerenciado).

**Aceitação:**
- [ ] Links de âncora rolam suavemente até as seções corretas.
- [ ] Header permanece acessível e legível (contraste AA) sobre qualquer seção ao rolar.
- [ ] No mobile, o menu abre/fecha por teclado e por toque; foco não "vaza" para trás do menu.
- [ ] "Reflexões" aponta para `reflexoes/` (não é só âncora).

### 1. Hero (primeira dobra)

- **Frase de abertura** (destaque editorial, grande) — `FRASE_HERO`, padrão:
  *"Há histórias que precisam, antes de tudo, encontrar um lugar onde possam ser escutadas."*
- Nome: **Giovanna Gimenez** — **Psicanalista Clínica**.
- Subtítulo: *Atendimento online para adolescentes e adultos.*
- Apoio — `HERO_APOIO`, padrão:
  *Um espaço de escuta para compreender emoções, relações e a própria história.*
- **CTA primário** — `HERO_CTA_LABEL` (padrão *Agendar sua primeira conversa*, botão oliva)
  + `HERO_CTA_URL` (padrão: link de WhatsApp/contato — placeholder).
- **CTA secundário** (texto) — `HERO_CTA2_LABEL` (padrão *Saiba mais*) +
  `HERO_CTA2_URL` (padrão: âncora `#sobre`, scroll suave).
- À direita: fotografia profissional (placeholder com `alt` pensado).

**Aceitação:**
- [ ] `<h1>` único da home contém o nome/identidade (ver §SEO).
- [ ] Os 5 placeholders (`FRASE_HERO`, `HERO_APOIO`, `HERO_CTA_LABEL`, `HERO_CTA_URL`,
      `HERO_CTA2_LABEL`, `HERO_CTA2_URL`) existem e estão delimitados por comentários.
- [ ] CTA primário visualmente proeminente (oliva); secundário em estilo de link.
- [ ] Layout não quebra a 320px (texto e foto reorganizam verticalmente).

### 2. Texto introdutório (fundo creme, muito respiro)

- `INTRO_P1`, padrão: *Existem momentos em que sentimos que repetimos os mesmos caminhos,
  carregamos angústias difíceis de nomear ou simplesmente percebemos que algo já não faz
  sentido como antes.*
- `INTRO_P2`, padrão: *A psicanálise oferece um espaço de escuta cuidadosa para que cada
  pessoa possa compreender sua própria história e construir novos sentidos para ela.*

**Aceitação:** [ ] Dois parágrafos editáveis; medida de linha confortável (~60–75 caracteres).

### 3. Como funciona (4 blocos, ícones SVG lineares)

| Ícone (SVG linear) | Título                    | Texto                                                    |
|--------------------|---------------------------|----------------------------------------------------------|
| folha/planta       | Atendimento online        | Sessões por vídeo, com conforto e sigilo.                |
| pomba/leveza       | Adolescentes e adultos    | Um espaço para diferentes momentos da vida.              |
| fala/balão         | Escuta psicanalítica      | Cada processo é único e respeita o tempo de cada pessoa. |
| cadeado            | Sigilo e ética            | O atendimento acontece com confidencialidade e respeito. |

**Aceitação:**
- [ ] 4 blocos em grid responsivo (4→2→1 colunas).
- [ ] Ícones são **SVG inline** (sem emoji), com `aria-hidden="true"` (decorativos).

### 4. Sobre mim (foto + texto, selo "Sobre mim") — `id="sobre"`

- `SOBRE_TITULO`, padrão: *Prazer, sou Giovanna Gimenez.*
- `SOBRE_TEXTO`, padrão: *Sou Giovanna Gimenez, psicanalista clínica. Acredito na escuta
  como possibilidade de compreender aquilo que, muitas vezes, ainda não encontrou palavras.
  Minha prática é fundamentada na ética da psicanálise e busca oferecer um espaço de
  acolhimento, reflexão e elaboração das experiências de cada sujeito.*
- Bloco **Formação e experiências** — lista **repetível** `SOBRE_FORMACAO` (fácil
  adicionar/remover itens). Padrões:
  - `SOBRE_FORMACAO_1`: *Formação em Psicologia (CRP 00/00000)*
  - `SOBRE_FORMACAO_2`: *Formação em Psicanálise (instituição)*
  - `SOBRE_FORMACAO_3`: *Estudos contínuos e participação em eventos e grupos de estudo*
- Botão — `SOBRE_CTA_LABEL` (padrão *Conhecer mais*) + `SOBRE_CTA_URL`.

**Aceitação:**
- [ ] Itens de formação em estrutura claramente repetível (comentário "copie este bloco").
- [ ] Foto com `alt` descritivo; layout foto+texto vira coluna única no mobile.

### 5. Áreas de atendimento (grid ícone + rótulo) — `id="psicanalise"`

- Lista **repetível** `AREAS_ATENDIMENTO`, cada item = rótulo + ícone SVG. Padrões:
  Relacionamentos · Autoestima · Ansiedade · Depressão · Autoconhecimento ·
  Conflitos familiares · Adolescência.

**Aceitação:**
- [ ] Grid responsivo; itens fáceis de adicionar/remover/reordenar (bloco comentado).
- [ ] Ícones SVG decorativos (`aria-hidden`); rótulo é o texto acessível.

### 6. Reflexões / Caderno Clínico (destaque, fundo verde oliva) — `id="reflexoes"`

- `REFLEXOES_TITULO`, padrão: *Um espaço para pensar, sentir e elaborar.*
- `REFLEXOES_APOIO`, padrão: *Textos breves sobre questões que atravessam nossa vida
  emocional e relacional.*
- Grid de **3 cards** de prévia (estrutura repetível; título + link por post). Padrões:
  - `REFLEXOES_CARD_1`: *O que o silêncio pode dizer?* + `REFLEXOES_CARD_1_URL`
  - `REFLEXOES_CARD_2`: *Ansiedade: quando tudo parece urgente* + `REFLEXOES_CARD_2_URL`
  - `REFLEXOES_CARD_3`: *Por que repetimos certas relações?* + `REFLEXOES_CARD_3_URL`
  - Cada card com link **Leia mais**.
- Botão — `REFLEXOES_CTA_LABEL` (padrão *Ler reflexões*) + `REFLEXOES_CTA_URL`
  (padrão `reflexoes/`).

**Aceitação:**
- [ ] Texto creme sobre oliva, contraste AA verificado.
- [ ] 3 cards linkam para os 3 posts reais; botão linka para a listagem.

> **Nota:** os títulos de exemplo dos cards (silêncio / ansiedade / repetição de relações)
> serão alinhados aos 3 posts reais (ansiedade, autoestima/relacionamentos, adolescência).
> Ver [Decisão D-5](#decisões-abertas) no plan.

### 7. Perguntas Frequentes (accordion acessível) — `id="faq"`

Itens (pergunta + resposta placeholder editável):
1. Quanto dura uma sessão?
2. Como funciona o atendimento online?
3. Qual a frequência?
4. Aceita convênio?
5. Como agendar?

**Aceitação:**
- [ ] Accordion via `<details>/<summary>` **ou** ARIA completo (`aria-expanded`,
      `aria-controls`), operável por teclado (Enter/Espaço, Tab).
- [ ] Respeita `prefers-reduced-motion` (sem animação brusca de abertura).
- [ ] Marcação compatível com JSON-LD `FAQPage` (ver §SEO).

### 8. Contato / CTA final (fundo verde oliva) — `id="contato"`

- Título: **Vamos conversar?**
- Apoio: *Estou aqui para oferecer um espaço de escuta e acolhimento.*
- Canais: **WhatsApp** (`(11) 99999-9999`), **Instagram**
  (`@giovannagimenez.psicanalise`), **E-mail** (`contato@giovannagimenez.com.br`),
  botão **Agendar atendimento**.

**Aceitação:**
- [ ] Links funcionais: `wa.me`/`https://wa.me/…` (placeholder), `mailto:`,
      `https://instagram.com/…`.
- [ ] Ícones SVG com rótulo textual acessível (não apenas ícone).

### 9. Rodapé

- Logo + tagline.
- Navegação repetida.
- Contato.
- Frase: *A psicanálise não oferece respostas prontas. Ela abre espaço para que você se
  escute de verdade.*
- Copyright + **ano dinâmico** (JS) com fallback do ano corrente no HTML.

**Aceitação:** [ ] Ano atualiza via JS; se JS desabilitado, ano-base ainda aparece.

---

## BLOG "Reflexões / Caderno Clínico"

- `/reflexoes/index.html`: listagem dos posts (card por post: título, data, tempo de
  leitura, resumo, link).
- `/reflexoes/posts/<slug>.html`: um arquivo por post.
- Cada post: `<article>` semântico com `<h1>` (título), data (`<time>`), tempo de leitura,
  conteúdo e **CTA final** para agendamento.
- **3 posts de exemplo**, ~400–600 palavras cada, tom acolhedor e profissional, conteúdo
  **original**:
  - Tema A: **Ansiedade**.
  - Tema B: **Autoestima / relacionamentos**.
  - Tema C: **Adolescência**.
- **Restrição ética de conteúdo:** não prometer cura, não dar diagnóstico, não substituir
  acompanhamento; linguagem de acolhimento e convite à escuta.

**Aceitação:**
- [ ] 3 posts publicados, linkados na home (§6) e na listagem.
- [ ] Cada post tem `<h1>` único, `<time datetime>`, tempo de leitura e CTA.
- [ ] Tom e restrições éticas respeitados.

---

## SEO e metadados (requisito de primeira classe)

- `<title>` e `meta description` **únicos** por página.
- **Open Graph** + **Twitter Card** (com imagem OG padrão).
- **JSON-LD Schema.org**:
  - Home: `ProfessionalService`/`Person` (psicanalista). *(LocalBusiness/MedicalBusiness
    sob avaliação — ver Decisão D-3.)*
  - FAQ: `FAQPage`.
  - Cada post: `Article` (`headline`, `datePublished`, `author`, `image`).
- `sitemap.xml` e `robots.txt` presentes e válidos.
- URLs limpas; headings hierárquicos corretos; **um `<h1>` por página**.
- `lang="pt-BR"`; `canonical` em todas as páginas.
- **Favicon** e ícones gerados a partir do monograma **"G"**.

**Aceitação:**
- [ ] Cada página tem title+description+canonical+OG+Twitter únicos.
- [ ] JSON-LD valida (Rich Results / validador Schema.org).
- [ ] `sitemap.xml` lista todas as páginas; `robots.txt` aponta o sitemap.
- [ ] Favicon e ícones presentes (monograma "G").

---

## Critérios de aceitação globais (resumo)

- [ ] Abre em `usuario.github.io/repo/` com todos os assets (caminhos relativos).
- [ ] Responsivo 320–1440px+, sem scroll horizontal.
- [ ] Âncoras com scroll suave; menu mobile acessível por teclado.
- [ ] Accordion de FAQ acessível.
- [ ] Lighthouse ≥ 95 nas quatro categorias.
- [ ] Paleta e tipografia exatamente conforme constitution.
- [ ] 3 posts publicados e linkados.
- [ ] JSON-LD válido; `sitemap.xml` e `robots.txt` presentes.
- [ ] `README.md` cobre publicar, editar textos, adicionar post e trocar fotos.
- [ ] `prefers-reduced-motion` respeitado.
