import express from 'express'

const server = express()

server.get('/', (_, res) => {
    return res.send('Olar Dev!')
})

export { server }
