import axios from 'axios'
import { should } from 'chai'
import faker from 'faker'
import { describe, it } from 'mocha'
import { GENDERS, SIZES, SPECIES, Animal } from '@patitas/model'
import * as dbHandler from './test-db-handler'

const instance = axios.create({ baseURL: 'http://localhost:8080/api' })

before(dbHandler.connect)
afterEach(dbHandler.clearDatabase)
after(dbHandler.disconnect)

should()

const createAnimal = (delta: Partial<Animal>): Animal => {
  return {
    name: faker.name.findName(),
    species: faker.random.arrayElement(SPECIES),
    gender: faker.random.arrayElement(GENDERS),
    age: faker.random.number(99),
    size: faker.random.arrayElement(SIZES),
    info: faker.lorem.sentence(),
    image: faker.image.imageUrl(),
    ...delta,
  }
}
const createMultipleAnimals = (n: number): Animal[] => Array.from({ length: n }, (_, _i) => createAnimal({}))

const withoutId = (obj: { _id?: string }) => {
  const { _id, ...response } = obj
  return response
}

describe('Animals API', () => {
  describe('List', () => {
    it('Should return a list including animals in the db', async () => {
      const animal = createAnimal({ name: 'pupi' })
      await dbHandler.save<Animal>('animals')(animal)
      const response = await instance.get<Animal[]>('/animals')
      withoutId(response.data[0]).should.be.deep.equal(animal)
    })
    describe('Pagination', () => {
      it('Limits the response to the expected amount', async () => {
        const animals = createMultipleAnimals(10)
        await dbHandler.save<Animal>('animals')(...animals)

        const limit = 3
        const response = await instance.get<Animal[]>(`/animals?limit=${limit}`)

        response.data.length.should.be.equal(limit)
      })

      it('Brings the expected animals basing on a start amount', async () => {
        const animals = createMultipleAnimals(10)
        await dbHandler.save<Animal>('animals')(...animals)

        const limit = 3
        const start = 2
        const response = await instance.get<Animal[]>(`/animals?limit=${limit}&start=${start}`)

        const expectedAnimals = animals.slice(start, start + limit)

        response.data
          .map(withoutId)
          .should.be.deep.equal(expectedAnimals)
      })

    })

  })

})
