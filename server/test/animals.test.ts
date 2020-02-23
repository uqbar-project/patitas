import axios from 'axios'
import chai from 'chai'
import { should } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import faker from 'faker'
import { describe, it } from 'mocha'
import { GENDERS, SIZES, SPECIES, Animal } from '@patitas/model'
import * as dbHandler from './test-db-handler'


const instance = axios.create({ baseURL: `http://localhost:${dbHandler.TEST_SERVER_PORT}/api` })

before(dbHandler.connect)
afterEach(dbHandler.clearDatabase)
after(dbHandler.disconnect)

should()
chai.use(chaiAsPromised)

const fakeId = () => faker.random.alphaNumeric(12)
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
  const SUCCESS = 200
  const NOT_FOUND = 404
  const BAD_REQUEST = 400
  const failedRequestMessage = (statusCode: number) => `Request failed with status code ${statusCode.toString()}`

  describe('List', () => {
    describe('Basic correct responses', () => {
      it('Should return a list including animals in the db', async () => {
        const animal = createAnimal({ name: 'pupi' })
        await dbHandler.save<Animal>('animals')(animal)
        const response = await instance.get<Animal[]>('/animals')
        withoutId(response.data[0]).should.be.deep.equal(animal)
      })
      it('Should return an empty list if there are no animals in the db', async () => {
        const response = await instance.get<Animal[]>('/animals')
        response.data.should.be.empty
      })
      it('Should return status is success even if there are no animals in the db', async () => {
        const response = await instance.get<Animal[]>('/animals')
        response.status.should.equal(SUCCESS)
      })
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

      it('When limit exheeds existing animals and start is not indicated, all animals are returned', async () => {
        const limit = 3
        const animals = createMultipleAnimals(limit - 1)
        await dbHandler.save<Animal>('animals')(...animals)

        const response = await instance.get<Animal[]>(`/animals?limit=${limit}`)

        response.data
          .map(withoutId)
          .should.be.deep.equal(animals)
      })
      it('When start exheeds existing animals, the response data is empty', async () => {
        const limit = 3
        const start = 6

        const animals = createMultipleAnimals(start - 1)
        await dbHandler.save<Animal>('animals')(...animals)
        const response = await instance.get<Animal[]>(`/animals?limit=${limit}&start=${start}`)
        response.data.should.be.empty
      })
      it('When start exheeds existing animals, the response status is success', async () => {
        const limit = 3
        const start = 6

        const animals = createMultipleAnimals(start - 1)
        await dbHandler.save<Animal>('animals')(...animals)
        const response = await instance.get<Animal[]>(`/animals?limit=${limit}&start=${start}`)
        response.status.should.be.equal(SUCCESS)
      })
    })
    describe('Filter', () => {
      it('Should return an empty list if no animals pass the filter', async () => {
        const ageLimit = 5
        const animal = createAnimal({ age: ageLimit })
        await dbHandler.save<Animal>('animals')(animal)
        const response = await instance.get<Animal[]>(`/animals?filter[age$lt]=${ageLimit}`)

        response.data.should.be.empty
      })
      it('Should return an empty list if no animals pass the filter', async () => {
        const ageLimit = 5
        const olderAnimal = createAnimal({ age: ageLimit })
        const youngerAnimal = createAnimal({ age: ageLimit - 1 })
        await dbHandler.save<Animal>('animals')(olderAnimal, youngerAnimal)
        const response = await instance.get<Animal[]>(`/animals?filter[age$lt]=${ageLimit}`)

        response.data.length.should.be.equal(1)
        withoutId(response.data[0]).should.be.deep.equal(youngerAnimal)
      })
    })

  })
  describe('Get by id', () => {
    it('Should return the animal if one exists with that id', async () => {
      const animal = createAnimal({})
      await dbHandler.save<Animal>('animals')(animal)

      const getAllResponse = await instance.get<Animal[]>('/animals')
      const animalWithId = getAllResponse.data[0]

      const response = await instance.get<Animal>(`/animals/${animalWithId._id}`)
      response.data.should.be.deep.equal(animalWithId)
    })
    it('Should fail with 404 if one does not exist with that id', async () => {
      instance.get<Animal>(`/animals/${fakeId()}`)
        .should.be.rejectedWith(failedRequestMessage(NOT_FOUND))
    })
  })
  describe('Post', () => {
    it('Should create a new animal in the db when data is correct', async () => {
      const animal = createAnimal({})
      await instance.post<Animal>('/animals', animal)
      const response = await instance.get<Animal[]>('/animals')
      withoutId(response.data[0]).should.be.deep.equal(animal)
    })
    describe('Validation failures', () => {
      it('Should not create a new animal without a name', async () => {
        const animal = createAnimal({ name: undefined })
        instance.post('/animals', animal)
          .should.be.rejectedWith(failedRequestMessage(BAD_REQUEST))
      })
      it('Should not create a new animal with an invalid species', async () => {
        const animal = createAnimal({})
        instance.post('/animals', { ...animal, gender: 'N' })
          .should.be.rejectedWith(failedRequestMessage(BAD_REQUEST))
      })
    })

  })

})
