import json from 'body-parser'
import express from 'express'
import mongo from './mongo'
import router from './routes'

export default (environment: string, mongoConnectionString: string) => {
  const app = express()

  app.use(mongo(mongoConnectionString, `patitas-${environment}`))
  app.use(json())
  app.use(router)

  return app
}


