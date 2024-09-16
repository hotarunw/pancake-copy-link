# Pancake Copy Link

ショートカットでコピー`Ctrl + Shift + C` 共有`Ctrl + Shift + S` できる。
タイトル&URLのエスケープ機能あり。

## インストール

1. `npm install`
2. `npm run build`
3. パッケージ化されていない拡張機能を読み込む

## 対応サイト

- コピー: 生テキスト
- コピー: MarkDown
- 共有: X(Twitter)

## 参考

CRXJSでChrome拡張機能をビルドしている。

- [Introduction | CRXJS Vite Plugin](https://crxjs.dev/vite-plugin)
- [【TypeScript】ReactとCRXJS Vite Pluginで作るChrome拡張機能](https://zenn.dev/7oh/scraps/98d5cdcceb9bd8)

## Attribution

### パンケーキの絵文字

[Pancake Emoji](https://github.com/twitter/twemoji/blob/d94f4cf793e6d5ca592aa00f58a88f6a4229ad43/assets/svg/1f95e.svg) by [Twemoji](https://github.com/twitter/twemoji) / [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## SVGからICON用のPNGを作成するスクリプト

```sh
magick -background none public/pancake.svg -resize 16x16   public/icon16.png
magick -background none public/pancake.svg -resize 48x48   public/icon48.png
magick -background none public/pancake.svg -resize 128x128 public/icon128.png
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
