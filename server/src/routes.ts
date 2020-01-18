import { AsyncRouter } from 'express-async-router'
import Animals from './controllers/Animals'

const router = AsyncRouter()

router.get('/ping', async () => 'OK')

router.post('/sign', async ({ body, media }) => media.sign(body))

// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// ANIMALS
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────

router.get('/animals', async ({ query: { limit = 0, start = 0 }, db }) =>
  Animals(db).list({
    limit: Number(limit),
    start: Number(start),
  })
)

router.get('/animals/:id', async ({ params: { id }, db }, res) => {
  const response = await Animals(db).read(id)
  if (!response) res.status(404)
  return response
})

router.post('/animals', async ({ db, body }, res) => {
  try {
    return await Animals(db).create(body)
  } catch (error) {
    res.status(400)
    return error
  }
})

router.put('/animals/:id', async ({ params: { id }, body, db }, res) => {
  try {
    return await Animals(db).update(id, body)
  } catch (error) {
    res.status(400)
    return error
  }
})

router.delete('/animals/:id', async ({ params: { id }, db }) => Animals(db).destroy(id))


export default router