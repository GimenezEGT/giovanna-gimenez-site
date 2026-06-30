# Contrato — Metadados/SEO e Placeholders

Não há API. Estes são os "contratos" que cada página e cada bloco de conteúdo devem cumprir.

## Contrato de página (todas)
- `lang="pt-BR"` no `<html>`.
- Exatamente **um** `<h1>`.
- `<title>` e `<meta name="description">` únicos.
- `<link rel="canonical">` apontando à URL da própria página.
- Open Graph (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`) + Twitter Card.
- Favicon (`assets/icons/favicon.svg`) e `theme-color`.
- Skip-link "Pular para o conteúdo"; landmarks (`header`/`main`/`footer`).
- CSS via `assets/css/styles.css` (caminho relativo conforme profundidade).

## Contrato de JSON-LD
- **Home**: `ProfessionalService` + `provider` `Person`; e bloco `FAQPage` espelhando o `#faq`.
- **Post**: `Article` com `headline`, `datePublished`, `dateModified`, `author`, `image`,
  `mainEntityOfPage`, `inLanguage: pt-BR`.
- Todo JSON-LD deve ser JSON válido e passar em validador de dados estruturados.

## Contrato de placeholders (a substituir no go-live)
| Placeholder | Significado |
|-------------|-------------|
| `https://SEU-USUARIO.github.io/SEU-REPO/` | URL canônica/base (ou domínio próprio) |
| `5511999999999` | WhatsApp (DDI+DDD+número) |
| `(11) 99999-9999` | Telefone exibido |
| `contato@giovannagimenez.com.br` | E-mail |
| `giovannagimenez.psicanalise` | Handle do Instagram |
| `CRP 00/00000` | Registro profissional |

## Contrato de mídia
- `<picture>` com `<source type="image/webp">` + `<img>` JPG de fallback.
- `width`/`height` explícitos; `loading="lazy"` (exceto hero); `alt` significativo.
