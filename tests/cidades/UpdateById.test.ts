import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - DeleteById', () => {

  it('Atualiza registro', async () => {

    const res1 = await testServer 
      .post('/cidades')
      .send({ nome: 'São Paulo' })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    const resApagada = await testServer
      .put(`/cidades/${res1.body}`)
      .send({ nome: 'São' })

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })

  it('Tenta atualizar registro que não existe', async () => {

    const res1 = await testServer
      .put('/cidades/99999')
      .send({ nome: 'São' })

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')

  })

})