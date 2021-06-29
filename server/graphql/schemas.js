const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Product {
    name: String
    price: Float
  }

  type RootQuery {
    product: Product
  }

  schema {
    query: RootQuery
  }
`);