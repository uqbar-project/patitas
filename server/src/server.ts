import cors from 'cors'
import { json } from 'body-parser'
import express from 'express'
import { AsyncRouter } from 'express-async-router'
import passport from 'passport'
import path from 'path'
import imgur from './middleware/imgur'
import mongo from './middleware/mongo'
import auth from './middleware/passport'
import router from './routes'
import nodemailer from './middleware/nodemailer'

type Arguments = {
  MONGO_CONNECTION_STRING: string,
  IMGUR_CLIENT_ID: string,
  GOOGLE_CLIENT_ID: string,
  GOOGLE_CLIENT_SECRET: string,
  EMAIL_USER: string,
  EMAIL_PASSWORD: string,
}
export default ({
  MONGO_CONNECTION_STRING,
  IMGUR_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  EMAIL_USER,
  EMAIL_PASSWORD,
}: Arguments) => {
  const app = express()

  app.use(cors())
  app.use(auth(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET))
  app.use(mongo(MONGO_CONNECTION_STRING))
  app.use(imgur(IMGUR_CLIENT_ID))
  app.use(nodemailer(EMAIL_USER, EMAIL_PASSWORD))
  app.use(json())

  const authRouter = AsyncRouter()

  authRouter.get('/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }))

  authRouter.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    async ({ user, query }) => {
      return JSON.stringify({ query, user })
    })

  app.use('/auth', authRouter)

  app.use('/api', router)


  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')))
    app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html')))
  }

  return app
}

