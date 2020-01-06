import { AsyncRouter } from 'express-async-router'
import Animals from './controllers/Animals'

const router = AsyncRouter()

router.get('/ping', async () => 'OK')

// TODO: Validations and tests
router.get('/animals', async ({ db }) => Animals(db).list())
router.get('/animals/:id', async ({ params: { id }, db }) => Animals(db).read(id))
router.post('/animals', async ({ db, body }) => Animals(db).create(body))
router.put('/animals/:id', async ({ params: { id }, body, db }) => Animals(db).update(id, body))
router.delete('/animals/:id', async ({ params: { id }, db }) => Animals(db).destroy(id))

export default router