import { RequestHandler } from 'express'
import { Db, MongoClient } from 'mongodb'
declare global {
  namespace Express {
    interface Request {
      db: Db
    }
  }
}

let client: MongoClient | undefined
export default (connectionString: string, databaseName: string): RequestHandler => async (req, _res, next) => {
  try {
    client = client || await MongoClient.connect(connectionString, { useNewUrlParser: true })
    req.db = client.db(databaseName)
    next()
  } catch (error) {
    client = undefined
    next(error)
  }
}