/* eslint-env node */
module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano")({
      preset: [
        "default",
        {
          mergeRules: true,
        },
      ],
    }),
    require("tailwindcss")() // Убедитесь, что используете корректное имя плагина
  ],
};
