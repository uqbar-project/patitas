import server from './server'

const { info } = console

const environmentVariable = (name: string): string => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable ${name}`)
  info(`Using environment variable ${name}=${value}`)
  return value
}

const NODE_ENV = environmentVariable('NODE_ENV')
const PORT = environmentVariable('REACT_APP_SERVER_PORT')
const MONGO_CONNECTION_STRING = environmentVariable('MONGO_CONNECTION_STRING')
const IMGUR_CLIENT_ID = environmentVariable('IMGUR_CLIENT_ID')

const app = server(MONGO_CONNECTION_STRING, IMGUR_CLIENT_ID)

app.listen(PORT, () => info(`Server started in ${NODE_ENV} mode at port ${PORT}`))