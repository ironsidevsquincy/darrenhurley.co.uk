module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: '0.10.47'
        },
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: [
    'transform-util-promisify'
  ],
}
