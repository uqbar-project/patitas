import { AsyncRouter } from 'express-async-router'

const router = AsyncRouter()

router.get('/ping', async () => 'OK')

export default router