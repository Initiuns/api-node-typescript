import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('UpdateById - Pessoas', () => {

  let cidadeId: number | undefined = undefined

  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste' })

    cidadeId = resCidade.body
  })

  it('Atualiza registro', async () => {

    const res1 = await testServer 
      .post('/pessoas')
      .send({ nomeCompleto: 'Felipe Assis', email: 'assisdesouza@outlook.com', cidadeId  })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    const resApagada = await testServer
      .put(`/pessoas/${res1.body}`)
      .send({ nomeCompleto: 'Felipe Assis Souza', email: 'assisdesouza@outlook.com', cidadeId: 25  })

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })

  it('Tenta atualizar registro que não existe', async () => {

    const res1 = await testServer
      .put('/pessoas/99999')
      .send({ nomeCompleto: 'Felipe Assis Souza', email: 'assisdesouza@outlook.com', cidadeId: 25  })

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')

  })

})