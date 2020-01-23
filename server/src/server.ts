import { json } from 'body-parser'
import cors from 'cors'
import express from 'express'
import imgur from './middleware/imgur'
import mongo from './middleware/mongo'
import router from './routes'

export default (mongoConnectionString: string, imgurClientId: string) => {
  const app = express()

  app.use(cors())
  app.use(mongo(mongoConnectionString))
  app.use(imgur(imgurClientId))
  app.use(json())
  app.use(router)

  return app
}

