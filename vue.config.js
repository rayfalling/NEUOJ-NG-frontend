const manifestJSON = require("./public/manifest.json");

module.exports = {
  pwa: {
    themeColor: manifestJSON.theme_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color
  },
  productionSourceMap: false
};