const { Product } = require('../models/Product');

module.exports = {
  // // GET all products. NOT WORKING.
  // getProducts: async (args, req) => {
  //   const products = await Product.find();
  //   console.log(products);
  //   return products;
  // },

  // GET one product.
  getProduct: async (args, req) => {
    const product = await Product.findOne({ _id: args._id });
    console.log(product);
    return product;
  },

  // CREATE new product.
  createProduct: async (args, req) => {
    try {
      const existingProduct = await Product.findOne({ name: args.productInput.name });
      if (existingProduct) {
        throw new Error('Product already existed.');
      };

      const product = new Product({
        name: args.productInput.name,
        price: args.productInput.price,
      });

      const createdProduct = await product.save();

      console.log(createdProduct);
      return { ...createdProduct._doc, _id: createdProduct._id.toString() };
    } catch (err) {
      console.error(err);
    }
  }
};