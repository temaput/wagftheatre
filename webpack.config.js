const webpack = require('webpack');

module.exports = {
  entry: './uifactory/main.js',
  output: {
    path: __dirname,
    filename: 'wag_ftheatre/static/scripts/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: [
            'transform-object-assign',
          ],
        },
        exclude: /(node_modules|bower_components)/,
      },
      {
        // desandros non compatible modules
        test: /(masonry-layout|outlayer|get-size|fizzy-ui-utils)/,
        loader: 'imports?define=>false&this=>window',
      },
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['url'],
      },
    ],
  },
  /*
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
  */
};
