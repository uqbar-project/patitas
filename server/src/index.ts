import server from './server'

const { log } = console

const PORT = process.env.PORT || '8080'
const NODE_ENV = process.env.NODE_ENV || 'development'
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '6wv5NT0VUwhchP5kuScYFia21YY'
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING ||
  'mongodb+srv://patitas-development:61TlMo6TogkqVfLu@cluster0-zxllh.mongodb.net/patitas-development?retryWrites=true'

const app = server(MONGO_CONNECTION_STRING, CLOUDINARY_API_SECRET)

app.listen(PORT, () => log(`Server started in ${NODE_ENV} mode at http://localhost:${PORT}`))