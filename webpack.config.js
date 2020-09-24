const path = require('path');

const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');


const MODE = {
  production: 'production',
  development: 'development',
};

const PATH = {
  build: path.join(__dirname, 'build'),
  src: 'src',
  static: 'static',
  resources: 'resources',
};

const PORT = 3000;


const commonStyleLoaders = [
  {
    loader: 'postcss-loader',
    options: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
  'sass-loader',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: `./${PATH.src}/shared.scss`,
    },
  },
];


module.exports = (env) => {
  const isDev = env === MODE.development;

  return {
    mode: isDev ? MODE.development : MODE.production,
    entry: `./${PATH.src}/index.jsx`,

    output: {
      path: PATH.build,
      filename: isDev ? `${PATH.static}/scripts/app.js` : `${PATH.static}/scripts/app.[contenthash].js`,
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(PATH.src),
      },
    },

    devtool: isDev ? 'inline-source-map' : false,

    optimization: {
      minimize: !isDev,
    },

    module: {
      rules: [
        /* SCRIPTS */
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },


        /* BASE STYLES */
        {
          test: /\.scss$/,
          exclude: [
            /(components|containers).*\.scss$/,
          ],
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            ...commonStyleLoaders,
          ],
        },


        /* STYLE MODULES */
        {
          test: /(components|containers).*\.scss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: isDev ? '[local]___[hash:base64:5]' : '[hash:base64]',
                },
              },
            },
            ...commonStyleLoaders,
          ],
        },


        /* SVG SPRITE */
        {
          test: /\.(svg)$/,
          include: [
            path.resolve(__dirname, `${PATH.src}/${PATH.resources}/icons`),
          ],
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId: 'icon-[name]',
              },
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { removeTitle: !isDev },
                  { removeViewBox: false },
                  { removeDimensions: true },
                  { removeAttrs: { attrs: '(stroke|fill)' } },
                ],
              },
            },
          ],
        },


        /* IMAGES */
        {
          test: /\.(jpg|jpeg|gif|svg|png|webp)$/,
          exclude: [
            path.resolve(__dirname, `${PATH.src}/${PATH.resources}/icons`),
          ],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isDev ? '[name].[ext]' : '[name].[contenthash:8].[ext]',
                outputPath: `./${PATH.static}/assets/images`,
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),

      new MiniCssExtractPlugin({
        filename: `${PATH.static}/styles/app.[contenthash].css`,
      }),

      new CssoWebpackPlugin(),

      new HtmlWebpackPlugin({
        template: `./${PATH.src}/index.html`,
      }),

      new CopyWebpackPlugin({
        patterns: [
          {
            from: `${PATH.src}/${PATH.resources}/assets`,
            to: `${PATH.static}/assets`,
          },
        ],
      }),

      new DefinePlugin({
        IS_DEVELOPMENT: isDev,
      }),
    ],

    devServer: {
      contentBase: PATH.build,
      compress: true,
      port: PORT,
    },
  };
};
