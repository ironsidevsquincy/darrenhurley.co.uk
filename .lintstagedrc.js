module.exports = {
  '*.ts': [
    'yarn lint',
    () => 'yarn typecheck'
  ]
}
