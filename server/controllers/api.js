import express from 'express'

const router = express.Router()

router.get('/slow', (req, res) => {
  const { wait = 0 } = req.query

  return setTimeout(() => {
    return res
      .type('text/javascript')
      .status(200)
      .send('(function(){})()')
  }, wait)
})

export default router
