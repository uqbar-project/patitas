import { Db, ObjectId } from 'mongodb'
import Animal from '../../../model/Animal'

const collection = (db: Db) => db.collection<Animal>('animals')

export default (db: Db) => ({

  list: async () => collection(db).find().toArray(),

  read: async (id: string) => collection(db).findOne(new ObjectId(id)),

  create: async (animal: Animal) => collection(db).save(animal),

  destroy: async (id: string) => collection(db).remove(new ObjectId(id)),

  update: async (id: string, updates: Partial<Animal>) => {
    const col = collection(db)
    const current = await col.findOne(new ObjectId(id))
    if (current) col.save({ ...current, ...updates })
    else throw new Error(`Unexistent animal ${id}`)
  },

})