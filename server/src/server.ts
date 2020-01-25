import { json } from 'body-parser'
import cors from 'cors'
import express from 'express'
import path from 'path'
import imgur from './middleware/imgur'
import mongo from './middleware/mongo'
import router from './routes'

export default (mongoConnectionString: string, imgurClientId: string) => {
  const app = express()

  app.use(cors())
  app.use(mongo(mongoConnectionString))
  app.use(imgur(imgurClientId))
  app.use(json())
  app.use('/api', router)

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', '..', '..', '..', 'client', 'build')))
    app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '..', '..', '..', '..', 'client', 'build', 'index.html')))
  }

  return app
}

