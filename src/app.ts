import express from 'express'
import path from 'path'

import * as controllers from './controllers/index.js'

const app = express()

app.set('views', path.join(import.meta.dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(import.meta.dirname, 'static')))

app.get('/', controllers.homepage)
app.use('/api', controllers.api)

export default app
