import server from './server'

const { log } = console

const PORT = process.env.PORT || '8080'
const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING ||
  'mongodb+srv://patitas-development:61TlMo6TogkqVfLu@cluster0-zxllh.mongodb.net/test?retryWrites=true'

const app = server(NODE_ENV, MONGO_CONNECTION_STRING)

app.listen(PORT, () => log(`Server started in ${NODE_ENV} mode at http://localhost:${PORT}`))