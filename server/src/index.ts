import server from './server'

const { info } = console

const environmentVariable = (name: string): string => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable ${name}`)
  info(`Using environment variable ${name}=${value}`)
  return value
}

const NODE_ENV = environmentVariable('NODE_ENV')
const PORT = environmentVariable('PORT')
const MONGO_CONNECTION_STRING = environmentVariable('MONGO_CONNECTION_STRING')
const IMGUR_CLIENT_ID = environmentVariable('IMGUR_CLIENT_ID')
const GOOGLE_CLIENT_ID = environmentVariable('GOOGLE_CLIENT_ID')
const GOOGLE_CLIENT_SECRET = environmentVariable('GOOGLE_CLIENT_SECRET')
const EMAIL_USER = environmentVariable('EMAIL_USER')
const EMAIL_PASSWORD = environmentVariable('EMAIL_PASSWORD')

environmentVariable('ADMINS')
environmentVariable('CLIENT_URL')

const app = server({
  MONGO_CONNECTION_STRING,
  IMGUR_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  EMAIL_USER,
  EMAIL_PASSWORD,

})

app.listen(PORT, () => info(`Server started in ${NODE_ENV} mode at port ${PORT}`))