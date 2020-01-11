import { should } from 'chai'
import { describe, it } from 'mocha'
import axios from 'axios'
import Animal from '../../model/Animal'
import server from '../src/server'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'
import faker from 'faker'

const mongoServer = new MongoMemoryServer({ debug: true })
let mongoClient: MongoClient

before(async () => {
  const connectionString = await mongoServer.getConnectionString()
  await new Promise(resolve =>
    server('test', connectionString).listen(8080, resolve)
  )
  mongoClient = await MongoClient.connect(connectionString)
})

const instance = axios.create({ baseURL: 'http://localhost:8080' })

should()

const createAnimal = (delta: Partial<Animal>): Animal => {
  return {
    name: faker.name.findName(),
    species: faker.random.arrayElement(['dog', 'cat']),
    gender: faker.random.arrayElement(['M', 'F']),
    age: faker.random.number(99),
    size: faker.random.arrayElement(['S', 'M', 'L']),
    info: faker.lorem.sentence(),
    image: faker.image.imageUrl(),
    ...delta
  }
}
const save = <T>(collectionName: string) => async (...objectsToSave: T[]) => {
  const collection = mongoClient.db('patitas-test').collection<T>(collectionName)
  for (const objectToSave of objectsToSave) {
    await collection.save({ ...objectToSave })
  }
}

const withoutId = (obj: { _id?: string }) => {
  const { _id, ...response } = obj
  return response
}

describe('Animals API', () => {
  it('GET /animals should return a list including animals in the db', async () => {
    const animal = createAnimal({ name: 'pupi' })
    await save<Animal>('animals')(animal)
    const response = await instance.get<Animal[]>('/animals')
    withoutId(response.data[0]).should.be.deep.equal(animal)
  })
})


