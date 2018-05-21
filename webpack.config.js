const path = require('path');
const buildPath = path.resolve(__dirname);
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    path.resolve(__dirname, 'js/index.js')
  ],
  output: {
    filename: 'js/bundle.js',
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.css|.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webm|mp4|otf)$/,
        loaders: ['file-loader']
      }, {
        test: /\.(txt)$/,
        loaders: ['raw-loader']
      }, {
       test: /\.(js)$/,
       use: 'babel-loader?presets[]=es2015',
       exclude: /(node_modules|bower_components)/,
      },
    ]
  },
  plugins: [new ExtractTextPlugin('css/style.css')],

  // Configuration for dev server
  devServer: {
    contentBase: buildPath,
    hot: true,
    inline: true,
    port: 8888,
    historyApiFallback: true
  }
}
