module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    './node_modules/gts', // gtsの設定を追加する
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist/', 'src/migrations/'], // ビルドディレクトリとtypeormの自動生成するファイルは対象外
  rules: {
    'node/no-unpublished-import': 'off', // テストコードのdevDependenciesのみで有効なモジュールが引っかかるので無効化する
  },
};
