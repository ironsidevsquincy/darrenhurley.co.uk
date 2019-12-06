module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        corejs: '3',
        targets: {
          node: '0.10.47'
        }
      }
    ]
  ],
  plugins: [
    'transform-util-promisify'
  ]
}
