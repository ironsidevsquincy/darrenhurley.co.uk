import express from 'express'
import path from 'path'

import * as controllers from './controllers'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', controllers.homepage)
app.use('/api', controllers.api)
app.get('/browser-support', controllers.browserSupport)

export default app
