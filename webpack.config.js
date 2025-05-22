const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Точка входа
  entry: './src/main.js',

  // Выходной бандл
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,   // очищать dist перед сборкой
  },

  // Расширения при импортах и алиасы
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: { '@': path.resolve(__dirname, 'src') },
  },

  // Сервер разработки
  devServer: {
    static: './public',
    hot: true,
    port: 3000,
    open: true,
  },

 module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.ts$/, 
        loader: 'ts-loader', 
        exclude: /node_modules/, 
        options: {
          appendTsSuffixTo: [/\.vue$/], 
          transpileOnly: true,          
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),  // для .vue файлов
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ]
};