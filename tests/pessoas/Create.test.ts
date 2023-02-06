import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Create - Pessoas', () => {

  let cidadeId: number | undefined = undefined

  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste' })

    cidadeId = resCidade.body
  })

  it('Cria registro', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({ nomeCompleto: 'Felipe Assis', email: 'assisdesouza@outlook.com', cidadeId })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')
  })

  it('Cria registro 2', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({ nomeCompleto: 'Felipe Assis', email: 'assisdesouza2@outlook.com', cidadeId })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')
  })

  it('Tenta criar registro com email duplicado', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({ nomeCompleto: 'Felipe Assis', email: 'assisdesouza2@outlook.com', cidadeId })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')

    const res2 = await testServer
      .post('/pessoas')
      .send({ nomeCompleto: 'Duplicado', email: 'assisdesouza2@outlook.com', cidadeId })

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res2.body).toHaveProperty('errors.default')
  })

  it('Não pode criar um registro com nomeCompleto muito curto', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({ nomeCompleto: 'Fe', email: 'assisdesouza@outlook.com', cidadeId })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
  })

  it('Tenta criar sem nomeCompleto', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({ email: 'assisdesouza@outlook.com', cidadeId })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
  })

  it('Tenta criar registro sem email', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({ nomeCompleto: 'Felipe Assis', cidadeId })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })

  it('Tenta criar registro com email inválido', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({ nomeCompleto: 'Felipe Assis', email: 'felipe .assis.com', cidadeId })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })

  it('Tenta criar registro sem cidadeId', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({ nomeCompleto: 'Felipe Assis', email: 'assisdesouza.felipe55@outlook.com' })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.cidadeId')
  })

  it('Tenta criar registro com cidadeId inválido', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({ nomeCompleto: 'Felipe Assis', email: 'felipe.assis@outlook.com', cidadeId: 'teste' })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.cidadeId')
  })

  it('Tenta criar registro sem enviar nenhuma propriedade', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({ })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
    expect(res1.body).toHaveProperty('errors.body.cidadeId')
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
  })

})
