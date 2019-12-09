module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  targets: '> 0.25%, not dead'
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
