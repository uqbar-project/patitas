import { Db, MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import server from '../src/server'

export const TEST_SERVER_PORT = 2020

const mongoServer = new MongoMemoryServer()
let mongoClient: MongoClient
let db: Db

const dropAllCollections = async () => await db.dropDatabase()

export const connect = async () => {
  const MONGO_CONNECTION_STRING = await mongoServer.getConnectionString()
  await new Promise(resolve =>
    server({
      MONGO_CONNECTION_STRING,
      IMGUR_CLIENT_ID: '',
      GOOGLE_CLIENT_ID: 'test_id',
      GOOGLE_CLIENT_SECRET: 'test_secret',
      EMAIL_USER: '',
      EMAIL_PASSWORD: '',
    }).listen(TEST_SERVER_PORT, resolve)
  )
  mongoClient = await MongoClient.connect(MONGO_CONNECTION_STRING)
  db = mongoClient.db()
}

export const clearDatabase = dropAllCollections

export const disconnect = async () => {
  await dropAllCollections()
  await mongoServer.stop()
}

export const save = <T>(collectionName: string) => async (...objectsToSave: T[]) => {
  const collection = db.collection<T>(collectionName)
  for (const objectToSave of objectsToSave) {
    await collection.save({ ...objectToSave })
  }
}