exports.up = (knex) => {
  return knex.schema.createTable('articles', (table) => {
    table.string('id').primary()
    table.timestamps()
    table.string('title')
    table.text('body')
    table.integer('read_count').default(0)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('articles')
}
