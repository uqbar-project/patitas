import { RequestHandler } from 'express'
import { Db, MongoClient } from 'mongodb'

declare global {
  namespace Express {
    interface Request {
      db: Db
    }
  }
}

export let client: MongoClient

export default (connectionString: string): RequestHandler => async (req, _res, next) => {
  try {
    client = client || await MongoClient.connect(connectionString, { useNewUrlParser: true })
    req.db = client.db()
    next()
  } catch (error) {
    next(error)
  }
}

// Rather basic check, might be able to define this basing on Mongo's QuerySelector
export const isValidOperator = (operator: string): boolean => ['eq', 'lt', 'gt', 'lte', 'gte'].includes(operator)