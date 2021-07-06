const gqlGetProducts = () => {
    return {
        query: `
            query {
                getProducts { 
                    _id 
                    name
                    price
                }
            }
        `
    }
};

const gqlAddProduct = ({ name, price }) => {
    return {
        query: ` 
            mutation {
                    createProduct(name: "${name}", price: ${price}) { 
                        _id
                        name
                        price
                    }
                }
            `
    }
};

const gqlDeleteProduct = ({ _id }) => {
    return {
        query: `
      mutation {
        deleteProduct(_id: "${_id}") {
          result
        }
      }`
    }
};

module.exports = {
    gqlGetProducts,
    gqlAddProduct,
    gqlDeleteProduct,
};