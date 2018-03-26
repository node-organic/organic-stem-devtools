var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var HappyPack = require('happypack')

var happyPackPlugin = function (name, loaders) {
  return new HappyPack({
    id: name,
    verbose: false,
    threads: require('os').cpus().length,
    loaders: loaders,
  })
}

var postcssLoaderOptions = {
  plugins: () => [
    precss(),
    autoprefixer(),
  ],
}

module.exports = {
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.tag', '.js'],
    modules: [
      'client/common',
      'node_modules',
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      'Popper': 'popper.js',
      'Waves': 'node-waves'
    }),
    new webpack.ProvidePlugin({
      oval: 'organic-oval',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    happyPackPlugin('pre-oval', [
      'organic-oval/webpack/oval-loader',
      'organic-oval/webpack/oval-control-statements-loader'
    ]),
    happyPackPlugin('oval', [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', {modules: false}],
          ],
        },
      },
    ]),
    happyPackPlugin('js', [
      {
        loader: 'babel-loader',
        options: {
          plugins: [
            ['transform-react-jsx', { pragma: 'createElement' }],
          ],
          presets: [
            ['es2015', {modules: false}],
          ],
        },
      },
    ]),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tag$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=pre-oval',
      },
      {
        test: /\.js|.tag$/,
        include: /node_modules\/organic-oval/,
        use: 'happypack/loader?id=oval',
      },
      {
        test: /\.js$|\.tag$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=js',
      },
      // Extract css files
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'less-loader?modules&importLoaders=1',
            {
              loader: 'postcss-loader',
              options: postcssLoaderOptions,
            },
          ],
        })
      },
      // extract less files
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1',
            'less-loader',
            {
              loader: 'postcss-loader',
              options: postcssLoaderOptions,
            },
          ],
        })
      }
    ]
  },
}
