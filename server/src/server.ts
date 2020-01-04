import express from 'express'
import router from './routes'

const { log } = console

const PORT = process.env.PORT || '8080'
const NODE_ENV = process.env.NODE_ENV || 'development'

const app = express()

app.use(router)

app.listen(PORT, () => log(`Server started in ${NODE_ENV} mode at http://localhost:${PORT}`))