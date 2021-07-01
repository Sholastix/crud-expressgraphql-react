const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Product {
    _id: ID!
    name: String!
    price: Float!
    createdAt: String!
    updatedAt: String!
  }

  type DeleteResponse {
    result: Boolean!
  }

  type RootQuery {
    getProducts: [Product!]
    getProduct(_id: ID!): Product!
  }

  type RootMutation {
    createProduct(name: String!, price: Float!): Product!
    updateProduct(_id: ID!, name: String!, price: Float!): Product!
    deleteProduct(_id: ID!): DeleteResponse
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);