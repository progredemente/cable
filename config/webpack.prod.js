const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');


const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(process.cwd(), 'docs'),
    clean: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'cable',
      remotes: {
        components: 'components@/components/remoteEntry.js'
      },
      shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      resourcesUrl: "/resources"
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: 'public',
                globOptions: {
                    ignore: ['**/*.html']
                }
            }
        ]
    })
  ],
};

module.exports = merge(commonConfig, prodConfig);
