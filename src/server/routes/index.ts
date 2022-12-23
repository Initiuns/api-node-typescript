import { Router } from 'express'
import { CidadesController } from '../controllers/cidades'

const router = Router()

router.get('/', (_, res) => {
  return res.send('Olar Dev!')
})

router.post(
  '/cidades', 
  CidadesController.createValidation,
  CidadesController.create
)

export { router }
