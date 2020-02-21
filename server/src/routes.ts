import { AsyncRouter } from 'express-async-router'
import multer from 'multer'
import Animals from './controllers/Animals'
import Members from './controllers/Members'
import { Member } from '@patitas/model'

const router = AsyncRouter()
const upload = multer()

router.get('/ping', async () => 'OK')

// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// IMAGES
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────

router.post('/images', upload.single('file'), async ({ media, file }, res) => {
  try {
    return media.createImage(file)
  } catch (error) {
    res.status(400)
    return error
  }
})

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

// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// MEMBERS
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────

router.get('/members', async ({ query: { limit = 0, start = 0 }, db }) =>
  Members(db).list({
    limit: Number(limit),
    start: Number(start),
  })
)

router.get('/members/:id', async ({ params: { id }, db }, res) => {
  const response = await Members(db).read(id)
  if (!response) res.status(404)
  return response
})

router.post('/members', async ({ db, body }, res) => {
  try {
    return await Members(db).create(body)
  } catch (error) {
    res.status(400)
    return error
  }
})

router.post('/members/request', async ({ db, mail, body }, res) => {
  const member: Member = body

  try {
    await Members(db).request(member, mail)
  } catch (error) {
    res.status(400)
    return error
  }
})

router.put('/members/:id', async ({ params: { id }, body, db }, res) => {
  try {
    return await Members(db).update(id, body)
  } catch (error) {
    res.status(400)
    return error
  }
})

router.delete('/members/:id', async ({ params: { id }, db }) => Members(db).destroy(id))


export default router