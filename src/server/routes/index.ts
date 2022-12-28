import { Router } from 'express'
import { CidadesController } from '../controllers/cidades'

const router = Router()

router.get('/', (_, res) => {
  return res.send('Olar Dev!')
})

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll)
router.post('/cidades', CidadesController.createValidation, CidadesController.create)
router.get('/cidades/:id', CidadesController.getByIdlValidation, CidadesController.getById)
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById)
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById)

export { router }
