// Dados aplicados a todos os posts em src/reflexoes/posts/*.md
module.exports = {
  layout: "post.njk",
  tags: "post",
  ogType: "article",
  root: "../../",
  // Preserva as URLs atuais dos posts (.html)
  permalink: "/reflexoes/posts/{{ page.fileSlug }}.html",
  eleventyComputed: {
    pageTitle: (data) => `${data.title} — Reflexões · Giovanna Gimenez`,
    ogTitle: (data) => data.title,
    ogDescription: (data) => data.resumo || data.description,
    // JSON-LD Article injetado no <head> pelo base.njk
    jsonld: (data) => {
      const iso = new Date(data.page.date).toISOString().slice(0, 10);
      const obj = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        datePublished: iso,
        dateModified: iso,
        inLanguage: "pt-BR",
        author: { "@type": "Person", name: "Giovanna Gimenez" },
        publisher: { "@type": "Person", name: "Giovanna Gimenez" },
        image: `${data.site.url}/assets/images/og-image.jpg`,
        mainEntityOfPage: `${data.site.url}${data.page.url}`,
      };
      return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`;
    },
  },
};
