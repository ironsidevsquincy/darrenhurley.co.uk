export default (req, res) => {
  return res
    .set('Cache-Control', 'max-age=300, public')
    .render('homepage')
}
