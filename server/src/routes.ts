import { AsyncRouter } from 'express-async-router'
import Animal from '../../model/Animal'

const router = AsyncRouter()

router.get('/ping', async () => 'OK')

// const allAnimals: Animal[] = [
// {
//   name: 'patan',
//   species: 'dog',
//   gender: 'male',
//   age: 22,
//   size: 'small',
//   info: 'he is an asshole',
//   image: 'https://definicion.de/wp-content/uploads/2013/02/patan.jpg',
// },
// ]

router.get('/animals', async ({ db }) =>
  db.collection<Animal>('animals').find().toArray()
)

export default router