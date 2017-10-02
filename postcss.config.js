module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    'postcss-import': { root: ctx.file.dirname },
    'postcss-cssnext': {},
    'cssnano': ctx.env === 'production' ? {} : false
  }
})