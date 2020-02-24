import { Db, ObjectId, FilterQuery } from 'mongodb'
import { Animal, validateAnimal, allKeys } from '@patitas/model'
import { isValidOperator } from '../middleware/mongo'

const { keys } = Object
const collection = (db: Db) => db.collection<Animal>('animals')

type AnimalFilter = Record<string, string>
type ListOptions = { limit: number, start: number, filters: AnimalFilter }

const queryFilter = (filters: AnimalFilter): FilterQuery<Animal> => {
  let filterQuery: FilterQuery<Animal> = {}

  for (const key in filters) {
    const [fieldName, operator] = key.split("$")
    if (!allKeys.includes(fieldName)) throw `Invalid key: ${fieldName}`
    if (!isValidOperator(operator)) throw `Invalid operator: ${operator}`

    filterQuery[fieldName] = filterQuery[fieldName] ?? {}
    filterQuery[fieldName][`$${operator}`] = fieldValueMapper(fieldName, filters[key])
  }
  return filterQuery
}

const fieldValueMapper = (fieldName: string, value: string) => {
  switch (fieldName) {
    case "age":
      return Number(value)
    default:
      return value
  }
}

export default (db: Db) => ({

  list: async ({ limit, start, filters }: ListOptions) => {
    return collection(db)
      .find(queryFilter(filters))
      .limit(limit)
      .skip(start)
      .toArray()
  },

  read: async (id: string) => collection(db).findOne(new ObjectId(id)),

  create: async (doc: Animal) => {
    const problems = validateAnimal(doc)
    if (keys(problems).length) throw problems
    collection(db).save(doc)
  },

  destroy: async (id: string) => { collection(db).deleteOne({ _id: id }) },

  update: async (id: string, delta: Partial<Animal>) => {
    const col = collection(db)
    const current = await col.findOne(new ObjectId(id))
    if (!current) throw new Error(`Unexistent animal ${id}`)

    const next = { ...current, ...delta }
    const problems = validateAnimal(next)
    if (keys(problems).length) throw problems

    col.save(next)
  },

})