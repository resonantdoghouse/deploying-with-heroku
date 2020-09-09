// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'instock',
      charset: 'utf8',
    },
  },
  staging: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL,
  },
  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL,
  },
};
