const { default: app } = require('./build/app')

const port = 3001

app.listen(port, () => console.log(`App running at http://localhost:${port}`))
