import { should } from 'chai'
import { describe, it } from 'mocha'
import axios from 'axios'
import Animal from '../../model/Animal'
import server from '../src/server'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'
import faker from 'faker'

const mongoServer = new MongoMemoryServer()
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
const dropAllCollections = async () => {
  await mongoClient.db('patitas-test').dropDatabase()
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

  it('Pagination for /animals limits the response to the expected amount', async () => {
    const animals = Array.from({ length: 10 }, (_, _i) => createAnimal({}))
    await save<Animal>('animals')(...animals)

    const limit = 3
    const response = await instance.get<Animal[]>(`/animals?limit=${limit}&start=2`)

    response.data.length.should.be.equal(limit)
  })
})

afterEach(async () => {
  dropAllCollections()
})
