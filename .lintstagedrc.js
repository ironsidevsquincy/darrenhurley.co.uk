module.exports = {
  '*.{js,ts}': [
    'yarn lint',
    () => 'yarn typecheck'
  ]
}
