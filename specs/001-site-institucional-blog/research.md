# Research — Decisões e trade-offs

Decisões registradas (detalhe em [../plan.md](../plan.md)):

| # | Decisão | Escolha | Justificativa |
|---|---------|---------|---------------|
| D-1 | Build do blog | **HTML puro, zero build** (sem Eleventy) | Simplicidade/zero-config no Pages; poucos posts. Template por cópia. |
| D-2 | Fontes | **Playfair Display + Lato** | Padrão da identidade; elegante e legível; `display=swap` + fallback. |
| D-3 | JSON-LD da home | **ProfessionalService + Person** | Atendimento online, sem endereço físico público. |
| D-4 | Dados de contato/CRP | **Placeholders** | Aguardando dados reais da cliente. |
| D-5 | Cards da home ↔ posts | **Alinhados aos 3 posts reais** | Coerência entre destaque e conteúdo. |
| D-6 | Áreas de atendimento | **7 áreas** | Conjunto padrão fornecido. |
| D-7 | URL canônica | **Placeholder** `https://SEU-USUARIO.github.io/SEU-REPO/` | Domínio próprio definido depois. |
| D-8 | Git | **git init + repo privado** (`GimenezEGT/giovanna-gimenez-site`) | Versionamento; Pages será resolvido junto com o domínio. |

## Alternativas consideradas

- **Eleventy/gerador estático**: rejeitado por adicionar Node + build; reavaliar se a
  frequência de posts crescer (> ~1/mês).
- **MedicalBusiness/LocalBusiness** no JSON-LD: rejeitado por exigir/insinuar endereço físico.

## Pendências (entram como tasks)

- Gerar/entregar versões **WebP** das fotos reais.
- Rodar **Lighthouse** pós-deploy (com URL real e imagens otimizadas).
- Substituir **placeholders** de URL e dados de contato/CRP.
