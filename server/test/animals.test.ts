import { should } from 'chai'
import { describe, it } from 'mocha'
import axios from 'axios'
import Animal from '../../model/Animal'
import server from '../src/server'
import { Server } from 'http'

let app: Server

before(done => {
  app = server(
    'development',
    'mongodb+srv://patitas-development:61TlMo6TogkqVfLu@cluster0-zxllh.mongodb.net/test?retryWrites=true'
  ).listen(8080, done)
})

const instance = axios.create({ baseURL: 'http://localhost:8080' })

should()

describe('Animals API', () => {
  it('GET /animals should return a list of animals', async () => {
    const response = await instance.get<Animal[]>('/animals')
    response.data.should.have.length.greaterThan(0)
  })
})

after(done => {
  app.close(done)
  console.log('ACA')
})