const routes = require("next-routes");

module.exports = routes()
  .add("portfolioNew", "/portfolio/new")
  .add("portfolio", "/portfolio/:id")
  .add("portfolioEdit", "/portfolio/:id/edit")
  .add("blogEditorUpdate", "/blogs/:id/edit")
  .add("userBlogs", "/blogs/me")
  .add("blogEditor", "/blogs/new")
  .add("blogDetail", "/blogs/:slug");
