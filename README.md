# webpack-separate-entry

A tiny helper method for splitting the webpack entry point.

## installation

```
yarn add -D webpack-separate-entry
```

```
npm i -D webpack-separate-entry
```

## usage

Here is a src directory.

```
src/
├─ a.ts
├─ B.tsx
├─ ignore_this.scss
├─ ignore.d.ts
├─ x.js
└─ sub/
    └─ c.ts
```

You can create multiple entry points with `separateEntry`.

```js
// webpack.config.js
const path = require("path");
const separateEntry = require("webpack-separate-entry");
module.exports = {
  // matches ts/tsx/js/jsx files but not .d.ts file
  entry: separateEntry('src', /\.(tsx?|jsx?)$/, /\d\.ts$/),

  ...
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
  }
}
```

You'll get separated js bundles on `lib` directory which has the same structure of `src`.

```
lib/
├─ a.js
├─ B.js
├─ x.js
└─ sub/
    └─ c.js
```
