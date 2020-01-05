import express from 'express'
import mongo from './mongo'
import router from './routes'

const { log } = console

const PORT = process.env.PORT || '8080'
const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING ||
  'mongodb+srv://patitas-development:61TlMo6TogkqVfLu@cluster0-zxllh.mongodb.net/test?retryWrites=true'

const app = express()

app.use(mongo(MONGO_CONNECTION_STRING, `patitas-${NODE_ENV}`))

app.use(router)

app.listen(PORT, () => log(`Server started in ${NODE_ENV} mode at http://localhost:${PORT}`))