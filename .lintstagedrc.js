export default  {
  '*.ts': [
    'yarn lint',
    () => 'yarn typecheck'
  ]
}
