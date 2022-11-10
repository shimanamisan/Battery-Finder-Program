module.exports = {
  // インストールしたpreset-envを指定
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 必要なポリフィルのみを取り込む設定
        corejs: 3, // corejsのバージョンを指定
        // debug: true // 取り込まれたポリフィルを確認するため
      },
    ],
  ],
};
