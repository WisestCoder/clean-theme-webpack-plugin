# CleanTheme for WebPack
A webpack plugin to remove/clean your build js of theme folder(s) before building

## Installation
```
npm i clean-theme-webpack-plugin --save-dev
```

## Usage
```js
const CleanThemeWebpackPlugin = require('clean-theme-webpack-plugin')

{
  plugins: [
    new CleanThemeWebpackPlugin({ options })
  ]
}
```

## Example Webpack Config
```javascript
plugins: [
  new CleanWebpackPlugin({
    root: './dist',
    theme: ['blue', 'green']
  })
]
```

### Options and defaults (Optional)
```js
{
  // Absolute path to your webpack output folder
  root: __dirname + '/dist',

  // Your themes
  theme: ['red', 'green']
}
```
