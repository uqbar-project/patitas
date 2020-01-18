import { json } from 'body-parser'
import cors from 'cors'
import express from 'express'
import cloudinary from './middleware/cloudinary'
import mongo from './middleware/mongo'
import router from './routes'

export default (mongoConnectionString: string, cloudinarySecret: string) => {
  const app = express()

  app.use(cors())
  app.use(mongo(mongoConnectionString))
  app.use(cloudinary(cloudinarySecret))
  app.use(json())
  app.use(router)

  return app
}

