import express from 'express'
import path from 'path'

import * as controllers from './controllers'

const app = express()
const port = 3001

app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/api', controllers.api)
app.get('/browser-support', controllers.browserSupport)

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
