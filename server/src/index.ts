import server from './server'

const { log } = console

const environmentVariable = (name: string): string => {
  const variable = process.env[name]
  if (!variable) throw new Error(`Missing required environment variable ${name}`)
  return variable
}

const NODE_ENV = environmentVariable('NODE_ENV')
const SERVER_PORT = environmentVariable('SERVER_PORT')
const CLOUDINARY_API_SECRET = environmentVariable('CLOUDINARY_API_SECRET')
const MONGO_CONNECTION_STRING = environmentVariable('MONGO_CONNECTION_STRING')

const app = server(MONGO_CONNECTION_STRING, CLOUDINARY_API_SECRET)

app.listen(SERVER_PORT, () => log(`Server started in ${NODE_ENV} mode at http://localhost:${SERVER_PORT}`))