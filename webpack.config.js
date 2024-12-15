'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true,
    watchFiles: ['src/**/*'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
  module: {
    rules: [
      // SCSS loader rules remain unchanged
      {
        test: /\.(scss)$/,
        use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    autoprefixer
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                  sassOptions: {
                    silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
                  }
                }
            },
          ]
      },
      // Image handling rule
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: 'asset/resource', // Built-in in Webpack 5
        generator: {
          filename: 'images/[name][hash][ext]', // Output in 'dist/images/'
        },
      },
      // HTML loader
      {
        test: /\.html$/i,
        loader: 'html-loader', // Resolves image paths in HTML
      },
    ],
  },
}