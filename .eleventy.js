// Eleventy: gera o site em _site/ a partir de src/.
// Home, 404, assets e admin são copiados como estão (passthrough); apenas a listagem,
// os posts (Markdown) e o sitemap são gerados. URLs dos posts são preservadas (.html).
module.exports = function (eleventyConfig) {
  // Processar apenas Nunjucks e Markdown como templates; o resto é passthrough.
  eleventyConfig.setTemplateFormats(["njk", "md"]);

  // Passthrough dos arquivos estáticos (mantêm caminhos/relativos atuais).
  ["assets", "admin", "index.html", "404.html", "robots.txt", "site.webmanifest", ".nojekyll"]
    .forEach((p) => eleventyConfig.addPassthroughCopy(`src/${p}`));

  // Coleção de posts do blog (ordenada por data, mais recente primeiro; sem rascunhos).
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByTag("post")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  // Filtros de data (pt-BR).
  const meses = ["janeiro","fevereiro","março","abril","maio","junho",
    "julho","agosto","setembro","outubro","novembro","dezembro"];
  eleventyConfig.addFilter("dataIso", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("dataExtenso", (d) => {
    const x = new Date(d);
    return `${x.getUTCDate()} de ${meses[x.getUTCMonth()]} de ${x.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("dataCurta", (d) => {
    const x = new Date(d);
    const abr = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
    return `${x.getUTCDate()} ${abr[x.getUTCMonth()]} ${x.getUTCFullYear()}`;
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
