import express from 'express'

const router = express.Router()

router.get('/slow', (req, res) => {
  const { pause = 0 } = req.query

  return setTimeout(() => {
    return res
      .type('text/javascript')
      .status(200)
      .send('(function(){})()')
  }, pause)
})

export default router
