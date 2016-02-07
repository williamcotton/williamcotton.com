const connection = process.env.DATABASE_URL

const knexConfig = {
  connection,
  client: 'pg',
  debug: false
}

console.log(knexConfig)

knexConfig.migrations = {
  directory: __dirname + '/migrations'
}

module.exports = {
  development: knexConfig,
  production: knexConfig
}
