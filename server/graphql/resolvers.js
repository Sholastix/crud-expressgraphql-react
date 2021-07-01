const { Product } = require('../models/Product');

module.exports = {
  // GET all products.
  getProducts: async (args, req) => {
    try {
      const products = await Product.find();
      console.log(products);
      return products;
    } catch (err) {
      console.error(err);
    }
  },

  // GET one specific product.
  getProduct: async (args, req) => {
    try {
      const product = await Product.findOne({ _id: args._id });
      console.log(product);
      return product;
    } catch (err) {
      console.error(err);
    }
  },

  // CREATE new product.
  createProduct: async (args, req) => {
    try {
      const existingProduct = await Product.findOne({ name: args.name });
      if (existingProduct) {
        throw new Error('Product already existed.');
      };

      const product = new Product({
        name: args.name,
        price: args.price,
      });

      const createdProduct = await product.save();

      console.log(createdProduct);
      return createdProduct;
      // return { ...createdProduct._doc, _id: createdProduct._id.toString() };
    } catch (err) {
      console.error(err);
    }
  }
};