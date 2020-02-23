import { Db, ObjectId } from 'mongodb'
import { Animal, validateAnimal } from '@patitas/model'
import { urlToMongoFilter } from '../middleware/mongo'

const { keys } = Object
const collection = (db: Db) => db.collection<Animal>('animals')

type ListOptions = { limit: number, start: number, filter: any }
type QueryFilter = {
  [P in keyof Animal]?: any
}

export default (db: Db) => ({

  list: async ({ limit, start, filter }: ListOptions) => {
    let queryFilter: QueryFilter = {}
    for (const key in filter) {
      console.log(`Filtering with ${key} -> ${filter[key]}`)
      //      const [fieldName, operator] = key.split("$")
      //      queryFilter[fieldName] = queryFilter[fieldName] || {}
      //      queryFilter[fieldName][`${operator}`] = filter[key]
      console.log(queryFilter)
    }
    return collection(db)
      .find(urlToMongoFilter(filter))
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