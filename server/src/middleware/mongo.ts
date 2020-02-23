import { RequestHandler } from 'express'
import { Db, MongoClient, FilterQuery } from 'mongodb'

declare global {
  namespace Express {
    interface Request {
      db: Db
    }
  }
}

export let client: MongoClient
export const urlToMongoFilter = <T>(_filter: any): FilterQuery<T> => {
  let filterQuery: FilterQuery<T> = {}
  return filterQuery
}
export default (connectionString: string): RequestHandler => async (req, _res, next) => {
  try {
    client = client || await MongoClient.connect(connectionString, { useNewUrlParser: true })
    req.db = client.db()
    next()
  } catch (error) {
    next(error)
  }
}