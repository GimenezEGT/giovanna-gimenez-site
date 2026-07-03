# Imagens — guia para a cliente

Esta pasta guarda as fotos do site. As duas imagens principais já usam **fotos reais**:
a **primeira dobra (hero)** usa uma foto de atmosfera (`giovanna-hero.jpg`/`.webp`) e a
seção **"Sobre mim"** usa o retrato da Giovanna (`giovanna-sobre.jpg`/`.webp`).

## Como colocar as fotos reais

1. Coloque a foto nesta pasta como `giovanna-hero.jpg` (e, se quiser, a versão otimizada
   `giovanna-hero.webp`) — o mesmo vale para `giovanna-sobre.jpg`/`.webp`.
2. No arquivo `index.html`, localize o bloco `<picture>` correspondente (há um comentário
   logo acima explicando) e troque as duas linhas que apontam para o `.svg` pelas versões
   `.jpg`/`.webp` já indicadas no comentário. É uma troca de duas linhas por seção.

> A foto de compartilhamento (`og-image.jpg`) **não** usa SVG: continua sendo um arquivo
> de imagem normal — basta substituí-lo mantendo o mesmo nome.

## Estética desejada

Fotos de **atmosfera**, não corporativas: luz natural suave, tons terrosos,
elementos como caderno, livro, cadeira, plantas, cerâmica, madeira, janela.
Transmitir acolhimento e serenidade — nada de fundo de escritório frio ou banco de imagens genérico.

## Arquivos esperados

| Nome do arquivo            | Onde aparece            | Proporção | Tamanho recomendado | Observações |
|----------------------------|-------------------------|-----------|---------------------|-------------|
| `giovanna-hero.jpg`        | Primeira dobra (home)   | 4:5 (retrato) | 640 × 800 px      | Foto principal da Giovanna |
| `giovanna-hero.webp`       | idem (versão otimizada) | 4:5       | 640 × 800 px        | Mesma foto em WebP |
| `giovanna-sobre.jpg`       | Seção "Sobre mim"       | 3:4 (retrato) | 480 × 640 px      | Retrato mais informal |
| `giovanna-sobre.webp`      | idem (versão otimizada) | 3:4       | 480 × 640 px        | Mesma foto em WebP |
| `og-image.jpg`             | Compartilhamento (redes/WhatsApp) | 1.91:1 | 1200 × 630 px | Texto curto + foto, ou só atmosfera |

> **Dica:** o navegador usa o `.webp` quando disponível (mais leve) e cai no `.jpg`
> automaticamente. Se você só tiver `.jpg`, pode deixar — o site funciona; mas gerar
> o `.webp` melhora a velocidade e a nota de performance.

## Como otimizar (opcional, recomendado)

- Exporte em **boa qualidade, mas comprimida** (mire em < 250 KB por foto).
- Ferramentas gratuitas: [squoosh.app](https://squoosh.app) (gera WebP e JPG),
  TinyPNG, ou o próprio editor de fotos exportando em qualidade ~80%.
- Mantenha as **proporções** da tabela para não distorcer o layout.

## Ícones do site

Os ícones de interface (favicon, ícones de seção) ficam em `../icons/` e são
SVGs — não precisam ser trocados. Para favicons em PNG (`apple-touch-icon.png`,
`icon-192.png`, `icon-512.png`, `favicon.ico`), gere a partir do monograma "G"
em [favicon.io](https://favicon.io) ou [realfavicongenerator.net](https://realfavicongenerator.net)
e coloque em `../icons/`.
