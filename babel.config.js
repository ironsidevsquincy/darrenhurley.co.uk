module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        corejs: '3',
        targets: {
          node: '14'
        }
      }
    ]
  ]
}
