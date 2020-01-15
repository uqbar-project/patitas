import { Db, ObjectId } from 'mongodb'
import Animal from '../../../model/Animal'
import { validate } from '../../../model/Animal'

const { keys } = Object
const collection = (db: Db) => db.collection<Animal>('animals')

type ListOptions = { limit: number, start: number }

export default (db: Db) => ({

  list: async ({ limit, start }: ListOptions) =>
    collection(db)
      .find()
      .limit(limit)
      .skip(start)
      .toArray(),

  read: async (id: string) => collection(db).findOne(new ObjectId(id)),

  create: async (doc: Animal) => {
    const problems = validate(doc)
    if (keys(problems).length) throw problems
    collection(db).save(doc)
  },

  destroy: async (id: string) => { collection(db).deleteOne({ _id: id }) },

  update: async (id: string, delta: Partial<Animal>) => {
    const col = collection(db)
    const current = await col.findOne(new ObjectId(id))
    if (!current) throw new Error(`Unexistent animal ${id}`)

    const next = { ...current, ...delta }
    const problems = validate(next)
    if (keys(problems).length) throw problems

    col.save(next)
  },

})