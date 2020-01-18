import { Db, MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import server from '../src/server'

const mongoServer = new MongoMemoryServer()
let mongoClient: MongoClient
let db: Db

const dropAllCollections = async () => await db.dropDatabase()

export const connect = async () => {
  const connectionString = await mongoServer.getConnectionString()
  await new Promise(resolve =>
    server(connectionString, '').listen(8080, resolve)
  )
  mongoClient = await MongoClient.connect(connectionString)
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