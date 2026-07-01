# Lighthouse — registro de auditorias (T037 / SC-003)

Meta (constituição IV): **≥ 95** em Performance, Acessibilidade, Práticas Recomendadas e SEO.

## Como rodar

**Local (preliminar)** — com o site servido em `http://localhost:8754`:

```bash
npx lighthouse http://localhost:8754/index.html \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new" --view
```

**Pós-deploy (oficial, SC-003)** — rodar contra a URL de produção, em aba anônima e sem
extensões, e registrar na tabela abaixo:

```bash
npx lighthouse https://psicanalisegiovannagimenez.netlify.app/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new" --view
```

> **Hospedagem:** o site é publicado no **Netlify** (repo privado; GitHub Pages em repo
> privado exigiria plano pago). Deploy automático a cada push em `main`. URL:
> `https://psicanalisegiovannagimenez.netlify.app/`.
> O workflow [`deploy.yml`](../../.github/workflows/deploy.yml) (GitHub Pages) segue no repo
> como alternativa, caso o repositório vire público no futuro.

## Resultados

| Data | Ambiente | URL | Perf | A11y | Best Pract. | SEO | Observações |
|------|----------|-----|:----:|:----:|:-----------:|:---:|-------------|
| 2026-06-30 | Local (preliminar) | `localhost:8754/index.html` | **99** | **100** | **100** | **100** | LH 13.4.0. FCP/LCP/SI ≈ 1,6 s · TBT 0 ms · CLS 0,023 |
| 2026-07-01 | Pós-deploy (oficial #1) | Netlify | **90** | **100** | **100** | **100** | LH 13.4.0 (mobile/throttle 4G). FCP/LCP ≈ 2,9 s · TBT 0 ms · CLS 0. **Perf < 95:** render-blocking do Google Fonts (~2.090 ms) |
| _pendente_ | Pós-deploy (oficial #2) | Netlify | — | — | — | — | Re-medir após deploy da correção de fontes assíncronas |

## Correções aplicadas para atingir a meta

Na 1ª rodada local a Acessibilidade veio **94** (< 95). Dois defeitos, corrigidos:

1. **Contraste (seção oliva `#reflexoes`/`#contato`):** `.selo` (sálvia ≈ 2,2:1) e
   `.apoio` (creme a 90%) abaixo de AA → passaram a usar `--cor-creme` cheio (mesmo tom
   do corpo, que já era AA-válido no fundo oliva).
2. **Ordem de headings:** o rodapé usava `<h4>` logo após um `<h2>` → trocado para `<h3>`
   (selector CSS `.rodape__grid h3` + HTML).

Após as correções: **99 / 100 / 100 / 100** local (todas ≥ 95). Zero falhas de a11y restantes.

### 2ª rodada — oficial em produção (Netlify)

A rodada oficial #1 acusou **Performance 90** (< 95). Sob o throttling de "mobile 4G" do
Lighthouse (que não existe no localhost), o **render-blocking do CSS do Google Fonts**
custava ~2.090 ms, elevando FCP/LCP para ~2,9 s. Correção:

3. **Fontes assíncronas:** o `<link>` do Google Fonts passou a carregar fora do caminho
   crítico (`media="print" onload="this.media='all'"`) com fallback `<noscript>`, em todas
   as 7 páginas. O texto renderiza imediatamente com as fontes de sistema e troca ao
   carregar Playfair/Lato (`font-display: swap` já ativo; compatível com o princípio de
   "funcionar sem o Google Fonts" da constituição).

Também corrigido de passagem: o `404.html` referenciava o CSS por uma URL-placeholder
(`SEU-USUARIO.github.io/SEU-REPO/...`), deixando a página 404 **sem estilo** em produção →
trocado por caminho root-absoluto `/assets/css/styles.css`.

> Falta a rodada oficial #2 (re-medir em produção após o deploy da correção de fontes) para
> confirmar Performance ≥ 95 e fechar a T037.
