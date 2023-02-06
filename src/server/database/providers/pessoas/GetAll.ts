import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IPessoa } from '../../models'

export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {

  try {
    const result = await Knex(ETableNames.usuario)
      .select('*')
      .where('nomeCompleto', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit)

    return result
  } catch (error) {
    console.log(error)
    return Error('Erro ao consultar os registros')
  }

}