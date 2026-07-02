# Data Model — Post do Caderno Clínico

Cada post é um arquivo **Markdown** em `src/reflexoes/posts/<slug>.md` com *front matter*.

## Front matter (campos)

| Campo         | Tipo    | Obrigatório | Descrição / uso                                             |
|---------------|---------|-------------|------------------------------------------------------------|
| `title`       | texto   | sim         | `<h1>`, `<title>`, `og:title`, JSON-LD `headline`          |
| `date`        | data    | sim         | `<time datetime>`, JSON-LD `datePublished`, ordenação      |
| `description` | texto   | sim         | resumo no card e `meta description`/`og:description`        |
| `cover`       | imagem  | não         | foto de capa (`artigo__capa`) e `og:image` do post         |
| `tags`        | lista   | não         | sempre inclui `post` (coleção); temas opcionais            |
| `tempoLeitura`| texto   | não         | ex.: "4 min" (se vazio, pode ser calculado do corpo)       |
| `draft`       | booleano| não         | `true` = rascunho (não publicado)                          |
| (corpo)       | markdown| sim         | conteúdo do artigo (parágrafos, subtítulos, imagens)       |

## Regras / validação
- **Slug/URL**: derivado do nome do arquivo → `/reflexoes/posts/<slug>.html` (preservado).
- **Rascunho**: `draft: true` é excluído do build público (não aparece em listagem/sitemap).
- **Imagens**: enviadas pelo CMS para `src/assets/images/posts/`; referenciadas por caminho
  relativo. `alt` obrigatório no editor.
- **Ordenação**: listagem por `date` desc.

## Coleção (Eleventy)
- `collections.post` = todos os `.md` com tag `post`, ordenados por data.
- Alimenta: `reflexoes/index.njk` (listagem) e `sitemap.njk`.

## Entidade: Usuário/Autor
- Identidade GitHub com acesso de escrita ao repositório (login no painel).
