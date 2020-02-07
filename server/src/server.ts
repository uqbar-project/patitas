import { json } from 'body-parser'
import cors from 'cors'
import express from 'express'
import { AsyncRouter } from 'express-async-router'
import passport from 'passport'
import path from 'path'
import imgur from './middleware/imgur'
import mongo from './middleware/mongo'
import auth from './middleware/passport'
import router from './routes'

export default (mongoConnectionString: string, imgurClientId: string, googleClientId: string, googleClientSecret: string) => {
  const app = express()

  app.use(cors())
  app.use(auth(googleClientId, googleClientSecret))
  app.use(mongo(mongoConnectionString))
  app.use(imgur(imgurClientId))
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
    app.use(express.static(path.join(__dirname, '..', '..', '..', '..', 'client', 'build')))
    app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '..', '..', '..', '..', 'client', 'build', 'index.html')))
  }

  return app
}

