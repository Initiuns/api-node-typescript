import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.get('/', (_, res) => {
  return res.send('Olar Dev!')
})

router.post('/teste', (req, res) => {
  console.log(req)

  return res.status(StatusCodes.ACCEPTED).json(req.body)
})

export { router }
