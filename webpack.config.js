const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerseWebpackPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const ASSET_PATH = process.env.ASSET_PATH || '/';

/* Can create several pages */
const pages =
  fs
    .readdirSync(path.resolve(__dirname, 'src'))
    .filter(fileName => fileName.endsWith('.html') || fileName.endsWith('.pug') )
    
/* Optimization css and js in production build */
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerseWebpackPlugin()
    ]
  }
  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: 'env'
    }
  }]
  // if(isDev){
  //   loaders.push('eslint-loader')
  // }
  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main:['./js/main.js',
    './sass/style.scss']
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: filename('js'),
    publicPath: '',
    // filename: '[name].[contenthash].[name]'
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.jpg', '.svg'],
  },
  optimization: optimization(),
  devServer: {
    port: 4100,
    hot: isDev
  },
  devtool: isDev ? 'source-map' : '',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          }
        }, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          }
        },'css-loader',
          'postcss-loader',
          'sass-loader']
      },
      {
        test: /\.pug$/,
        use: ['html-loader?attrs=false', 'pug-html-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/i,
        loader: 'file-loader?name=./img/[name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader?name=./fonts/[contenthash].[ext]'
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/img'),
        to: path.resolve(__dirname, 'build/img')
      },
      {
        from: path.resolve(__dirname, './src/json'),
        to: path.resolve(__dirname, 'build/json')
      },
      {
        from: path.resolve(__dirname, './src/js/libs/'),
        to: path.resolve(__dirname, 'build/js/libs')
      },
      {
        from: path.resolve(__dirname, './src/js/getintent_pixel'),
        to: path.resolve(__dirname, 'build/js/')
      }
    ]),
    new MiniCssExtractPlugin({
      // moduleFilename: ({ name }) => `${name.replace('.js', '')}.css`,
      filename: filename('css')
    }),
    ...pages.map(page => new HtmlWebpackPlugin({
      // inject: false,
      hash: true,
      template: page,
      filename: `${page.split('.')[0]}.html`,
      minify: {
        collapseWhitespace: isProd
      }
    })),
    /* Now off */ 
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true
    }),
    new CleanWebpackPlugin(),
  ]
};