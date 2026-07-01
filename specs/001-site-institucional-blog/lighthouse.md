# Lighthouse — registro de auditorias (T037 / SC-003)

Meta (constituição IV): **≥ 95** em Performance, Acessibilidade, Práticas Recomendadas e SEO.

## Como rodar

**Local (preliminar)** — com o site servido em `http://localhost:8754`:

```bash
npx lighthouse http://localhost:8754/index.html \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new" --view
```

**Pós-deploy (oficial, SC-003)** — trocar a URL pela do GitHub Pages já publicado
(ex.: `https://gimenezegt.github.io/giovanna-gimenez-site/`). Rodar em aba anônima,
sem extensões. Registrar os números na tabela abaixo.

> **Pré-requisito do deploy:** habilitar GitHub Pages no repositório com
> **Settings → Pages → Build and deployment → Source = "GitHub Actions"**. O workflow
> [`deploy.yml`](../../.github/workflows/deploy.yml) já publica a raiz a cada push em `main`.

## Resultados

| Data | Ambiente | URL | Perf | A11y | Best Pract. | SEO | Observações |
|------|----------|-----|:----:|:----:|:-----------:|:---:|-------------|
| 2026-06-30 | Local (preliminar) | `localhost:8754/index.html` | **99** | **100** | **100** | **100** | LH 13.4.0. FCP/LCP/SI ≈ 1,6 s · TBT 0 ms · CLS 0,023 |
| _pendente_ | Pós-deploy (oficial) | _GitHub Pages_ | — | — | — | — | Rodar quando o site estiver no ar |

## Correções aplicadas para atingir a meta

Na 1ª rodada local a Acessibilidade veio **94** (< 95). Dois defeitos, corrigidos:

1. **Contraste (seção oliva `#reflexoes`/`#contato`):** `.selo` (sálvia ≈ 2,2:1) e
   `.apoio` (creme a 90%) abaixo de AA → passaram a usar `--cor-creme` cheio (mesmo tom
   do corpo, que já era AA-válido no fundo oliva).
2. **Ordem de headings:** o rodapé usava `<h4>` logo após um `<h2>` → trocado para `<h3>`
   (selector CSS `.rodape__grid h3` + HTML).

Após as correções: **99 / 100 / 100 / 100** (todas ≥ 95). Zero falhas de a11y restantes.

> A rodada local prevê bem o resultado pós-deploy; a rodada oficial (SC-003) ainda deve ser
> feita no site publicado e registrada na tabela acima para fechar a T037.
