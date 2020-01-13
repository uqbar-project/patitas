import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'
import server from '../src/server'

const mongoServer = new MongoMemoryServer()
let mongoClient: MongoClient

const db = () => mongoClient.db('patitas-test')
const dropAllCollections = async () => await db().dropDatabase()

export const connect = async () => {
  const connectionString = await mongoServer.getConnectionString()
  await new Promise(resolve =>
    server('test', connectionString).listen(8080, resolve)
  )
  mongoClient = await MongoClient.connect(connectionString)
}

export const clearDatabase = dropAllCollections

export const disconnect = async () => {
  await dropAllCollections()
  await mongoServer.stop()
}

export const save = <T>(collectionName: string) => async (...objectsToSave: T[]) => {
  const collection = db().collection<T>(collectionName)
  for (const objectToSave of objectsToSave) {
    await collection.save({ ...objectToSave })
  }
}