const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
// JSのコメントをビルド時に削除する
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',
  optimization: {
    // optimizationの設定の中のminimizerという設定にUglifyJsPluginインスタンスを渡す
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true, // console.log を出力するかどうか
          },
        },
      }),
    ],
  },
});
