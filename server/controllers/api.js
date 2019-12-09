import express from 'express'

const router = express.Router()

router.get('/slow', (req, res) => {
  const { wait = 0 } = req.query

  return setTimeout(() => {
    return res
      .set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', '0')
      .type('text/javascript')
      .status(200)
      .send('(function(){})()')
  }, wait)
})

export default router
