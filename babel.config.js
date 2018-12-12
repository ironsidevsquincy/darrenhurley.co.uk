const presets = [
  [
    '@babel/env',
    {
      targets: {
        node: '0.10.47'
      },
      useBuiltIns: 'usage'
    }
  ]
]

module.exports = { presets }
