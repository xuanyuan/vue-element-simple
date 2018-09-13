const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ["babel-polyfill", './src/main.js'],
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
    hot: true // 启动HMR
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      // 匹配后缀名为css的文件, 然后分别用css-loader， vue-style-loader去解析
      // 解析器的执行顺序是从下往上(先css-loader再vue-style-loader)
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ],
    }, {
      test: /\.less$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'less-loader'
      ]
    }, {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
      ],
    }, {
      test: /\.sass$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader?indentedSyntax'
      ],
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ["es2015", "stage-3"]
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          'scss': [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ],
          'sass': [
            'vue-style-loader',
            'css-loader',
            'sass-loader?indentedSyntax'
          ]
        }
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'my-title',
      minify: {
        removeAttributeQuotes: true
      },
      hash: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJSPlugin()
  ])
}