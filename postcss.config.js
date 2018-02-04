module.exports = (ctx) => ({
  map: false,
  plugins: {
    'postcss-import': { root: ctx.file.dirname },
    'postcss-css-variables': {},
    'postcss-custom-media': {},
    'autoprefixer': {},
    'css-mqpacker': {},
    'cssnano': ctx.env === 'production' ? { "sourcemap": false, "discardComments": {"removeAll": true} }  : false
  }
})