const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Product {
    _id: ID!
    name: String!
    price: Float!
    createdAt: String!
    updatedAt: String!
  }

  input ProductInputData {
    name: String!
    price: Float!
  }

  type RootQuery {
    getProducts: Product
    getProduct(_id: ID!): Product!
  }

  type RootMutation {
    createProduct(productInput: ProductInputData): Product!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);