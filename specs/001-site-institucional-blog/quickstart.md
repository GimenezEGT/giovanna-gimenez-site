# Quickstart — rodar, verificar e publicar

## Rodar localmente
```bash
python -m http.server 8000
# acesse http://localhost:8000
```
Ou abra `index.html` direto no navegador.

## Verificar (checagens rápidas)
- **JSON-LD válido**: extrair blocos `application/ld+json` e validar como JSON.
- **Links internos**: conferir que `href`/`src` relativos resolvem para arquivos existentes.
- **1 `<h1>` por página** e `lang="pt-BR"`, `canonical`, OG presentes.
- **FAQ ↔ JSON-LD**: nº de `<summary>` = nº de `Question` no `FAQPage`.
- **Responsivo**: testar 320 / 768 / 1024 / 1440 px sem scroll horizontal.
- **Teclado**: Tab por menu/âncoras/FAQ/CTAs com foco visível; `Esc` fecha o menu mobile.
- **Lighthouse**: rodar após o deploy (URL real + imagens otimizadas).

## Publicar (GitHub Pages)
1. Substituir `https://SEU-USUARIO.github.io/SEU-REPO/` pela URL real (ou domínio próprio).
2. Push na `main` → workflow `.github/workflows/deploy.yml` publica.
3. Em **Settings → Pages → Source**, usar **GitHub Actions**.
4. Para domínio próprio: adicionar arquivo `CNAME` + configurar DNS.

> Repo privado exige conta Pro para Pages; senão, tornar público no lançamento.
