import { Handler } from 'express'

const handler: Handler = (req, res) => {
  return res
    .set('Cache-Control', 'max-age=300, public')
    .render('homepage')
}

export default handler
