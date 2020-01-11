import { should } from 'chai'
import { describe, it } from 'mocha'
import axios from 'axios'
import Animal from '../../model/Animal'
import server from '../src/server'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'

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

describe('Animals API', () => {
  it('GET /animals should return a list including animals in the db', async () => {
    const animalsCollection = mongoClient.db('patitas-test').collection<Animal>('animals')
    await animalsCollection.save({ name: 'pupi', species: 'dog', gender: 'M', age: 33, size: 'M', info: '', image: '' })
    const response = await instance.get<Animal[]>('/animals')
    response.data[0].name.should.be.equal('pupi')
  })
})

