var webpack = require('webpack')

module.exports = {
  'resolve': {
    'extensions': ['', '.webpack.js', '.web.js', '.js']
  },
  'plugins': [
    new webpack.NoErrorsPlugin()
  ],
  'module': {
    'loaders': []
  }
}
