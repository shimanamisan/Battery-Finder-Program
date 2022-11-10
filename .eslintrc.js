module.exports = {
  // この階層よりも親階層のディレクトリを探しに行かなくなる
  root: true,
  // 検証するJavaScriptの実行環境を指定する
  env: {
    // ブラウザで動作するJavaScriptなのかNode.jsで動作するJavaScriptなのか指定する
    browser: true, // console.log() などを使用してもエラーとならない
    es2020: true, // es2020までの構文を利用してもエラーとならない
  },
  // 新しい構文でも使用できるようにする
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module', // import, export などのesmodulesの構文を利用してもエラーとならない
  },
  // 外部で提供されるルールを適応させる
  extends: ['eslint:recommended', 'prettier'], // ESLintが提供しているおすすめのルールを適応
  // ルールを指定する
  // extendsで指定したルールと重複した場合はこちらの設定が有効になる
  rules: {
    'prefer-const': 'error', // 更新をしない変数にconst以外が指定されていたらエラーが発生するルール
    'no-import-assign': 'off', // import 文で作成した変数への代入のチェックを無効化
  },
};
