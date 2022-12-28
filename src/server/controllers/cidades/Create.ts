import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validation'

interface ICidade {
  nome: string
  estado: string
}
interface IFilter {
  filter?: string
}

export const createValidation = validation((getSchema) => ({

  body: getSchema<ICidade>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      estado: yup.string().required().min(2)
    })
  ),
  query: getSchema<IFilter>(
    yup.object().shape({
      filter: yup.string().required().min(3)
    })
  )

}))

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(`Nome: ${req.body.nome}`)
  console.log(`Estado: ${req.body.estado}`)
  
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!')
}