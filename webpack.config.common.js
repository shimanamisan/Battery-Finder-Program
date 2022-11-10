const path = require('path');
const dist = path.resolve(__dirname, 'dist');
const src = path.resolve(__dirname, 'src');

// 別ファイルに出力したCSSファイルを圧縮するために必要
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 出力先をクリーンアップしてからファイルを出力するプラグイン
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// HTMLテンプレートからバンドルファイルを読み込んだHTMLファイルを出力するプラグイン
const HtmlWebpackPlugin = require('html-webpack-plugin');

// ESLintを使用するためのプラグイン
const ESLintPlugin = require('eslint-webpack-plugin');

// jsファイルとcssファイルを分割するためのプラグイン
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    // 絶対パスを指定
    path: dist,
    // 出力するファイル名を設定
    // pathで指定したディレクトリに出力される
    // ディレクトリを含めるとjsやcssを分けて出力できる
    filename: './js/bundle.mim.js',
  },
  module: {
    rules: [
      // *********************************
      // * JSファイルに対する設定（主にBabel）
      // *********************************
      {
        // ローダーの処理対象を指定
        test: /\.js$/,
        // ローダーの処理対象から除外するディレクトリを指定
        exclude: /node_modules/,
        loader: 'babel-loader',
        // ローダーに対する設定は babel.config.js というファイルに切り出して設定する
      },
      // ***********************
      // * scssに関する設定
      // ***********************
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // ***********************
      // * 画像ファイルに関する設定
      // ***********************
      {
        // webpack 5からurl-loader/file-loader/raw-loaderが要らなくなった
        // 拡張子の大文字も許容するように最後尾に i を加える
        // jpegとjpgの様にeがあるかないかを許容するのに、jpe?gという形式にする
        test: /\.(jpe?g|png|svg|gif|ico|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  // 各種プラグインを読み込む
  plugins: [
    // 指定した出力ディレクトリ内のファイルをクリーンアップ（削除）する
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!**.json'],
    }),
    // jsファイルとcssファイルを分割するためのプラグイン
    new MiniCssExtractPlugin({
      // エントリーポイントのoutputオプションのfilenameと同じ動作をする
      filename: `./css/style.min.css`,
    }),
    // HTMLのテンプレートファイルからバンドルされたモジュールを読み込んだHTMLファイルを出力する
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
    }),
    // ESLintを使用するためのプラグイン
    new ESLintPlugin({
      fix: true, // 一部のエラーを自動で修正する
    }),
  ],
  optimization: {
    minimizer: [
      // CSSの冗長な記述を最適化して出力する
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  resolve: {
    // エイリアスを指定
    alias: {
      '@js': `${src}/js`,
      '@scss': `${src}/scss`,
    },
    // importするときのファイル名から拡張子部分を省略できるようになる
    extensions: ['*', '.js', '.scss', '.json', '.jpg'],
  },
};
