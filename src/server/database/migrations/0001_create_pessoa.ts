
import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.usuario, table => {
      table.bigIncrements('id').primary().index()
      table.string('nomeCompleto').index().notNullable()
      table.string('email').unique().notNullable()

      table
        .bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.cidade)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')

      table.comment('Tabela usada para armazenar pessoas do sistema')
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.usuario}`)
    })
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.usuario)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.usuario}`)
    })
}


