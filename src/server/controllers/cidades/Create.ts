import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { ICidade } from '../../database/models'
import { CidadesProvider } from '../../database/providers/cidades'

import { validation } from '../../shared/middleware'

interface IBodyProps extends Omit<ICidade, 'id'> {
  nome: string;
}
// interface IFilter {
//   filter?: string
// }

export const createValidation = validation((getSchema) => ({

  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
    })
  ),
  // query: getSchema<IFilter>(
  //   yup.object().shape({
  //     filter: yup.string().required().min(3)
  //   })
  // )

}))

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await CidadesProvider.create(req.body)
  
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.CREATED).json(result)
}