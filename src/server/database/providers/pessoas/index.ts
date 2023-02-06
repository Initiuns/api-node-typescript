import * as create from './Create'
import * as getAll from './GetAll'
import * as GetById from './GetById'
import * as UpdateById from './UpdateById'
import * as DeleteById from './DeleteById'
import * as Count from './Count'

export const PessoasProvider = {
  ...create,
  ...getAll,
  ...GetById,
  ...UpdateById,
  ...DeleteById,
  ...Count
}