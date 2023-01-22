import { Knex } from './server/database/knex'
import { server } from './server/Server'

const startServer = () => {
  server.listen(process.env.PORT || 5050, () => console.log(`App rodando na porta ${process.env.PORT || 5050}`))
}


if(process.env.ISLOCALHOST !== 'true') {
  Knex.migrate.latest().then(() => {
    startServer()
  })
    .catch(console.log)
}
else {
  startServer()
}