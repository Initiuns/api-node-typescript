import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validation'

interface IParamsProps {
  id?: number
}

export const getByIdlValidation = validation((getSchema) => ({

  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  )

}))

export const getById = async (req: Request<IParamsProps>, res: Response) => {
  console.log(`Nome: ${req.params.id}`)
  
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!')
}