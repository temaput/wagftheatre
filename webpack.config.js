var webpack = require("webpack");
module.exports = {
  entry: "./uifactory/main.js",
  output: {
    path: __dirname,
    filename: "wag_ftheatre/static/scripts/bundle.js"
  },
  module: {
    loaders: [
      { 
        test: /\.jsx?$/,
        loader: "babel",
        query: {
          presets: ['es2015', 'react']
        },
        exclude: /(node_modules|bower_components)/ 
      },
      {
        test: /(masonry-layout|outlayer|get-size|fizzy-ui-utils)/,  //desandros non compatible modules
        loader: 'imports?define=>false&this=>window'
      },
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};
