import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('GetById - Cidades', () => {

  let cidadeId: number | undefined = undefined

  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste' })

    cidadeId = resCidade.body
  })

  it('Buscar registro por id', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({ nomeCompleto: 'Felipe Assis', email: 'assisdesouza@outlook.com', cidadeId })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    const resBuscada = await testServer
      .get(`/pessoas/${res1.body}`)
      .send()

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
    expect(resBuscada.body).toHaveProperty('nomeCompleto')
  })

  it('Tenta buscar registro que não existe', async () => {
    const res1 = await testServer
      .get('/pessoas/99999')
      .send()

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')
  })

})
