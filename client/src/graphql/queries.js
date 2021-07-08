// GET_ALL
export const gqlGetProducts = () => {
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

// GET_ONE
export const gqlGetProduct = ({ _id }) => {
    return {
        query: `
            query {
                getProduct(_id: "${_id}") { 
                    _id 
                    name
                    price
                    createdAt
                    updatedAt
                }
            }
        `
    }
};

// POST
export const gqlAddProduct = ({ name, price }) => {
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

// PUT
export const gqlUpdateProduct = ({ _id, name, price }) => {
    return {
        query: `
            mutation {
                updateProduct(_id: "${_id}", name: "${name}", price: ${price}) {
                    _id
                    name
                    price
                }
            }
        `
    }
};

//DELETE
export const gqlDeleteProduct = ({ _id }) => {
    return {
        query: `
            mutation {
                deleteProduct(_id: "${_id}") {
                    result
                }
            }
        `
    }
};