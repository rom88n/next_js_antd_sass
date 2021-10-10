/* eslint-disable */
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const fs = require('fs')
const path = require('path')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './antd-custom.less'), 'utf8')
)

module.exports = withCSS(withSass(withLess({
  webpack5: false,
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    if (!dev) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'disabled',
          // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
          generateStatsFile: true,
          // Will be available at `.next/stats.json`
          statsFilename: 'stats.json'
        })
      );
    } else {
      config.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',

        include: [
          path.resolve('components'),
          path.resolve('pages'),
          path.resolve('utils'),
          path.resolve('redux-base'),
          path.resolve('containers')
        ],
        options: {
          configFile: path.resolve('.eslintrc'),
          eslint: {
            configFile: path.resolve(__dirname, '.eslintrc')
          }
        },
        loader: 'eslint-loader'
      });
      config.devtool = 'source-map';
    }

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // console.log(config, '@@')
    // Important: return the modified config
    return config;
  }
})));
