const { Product } = require('../models/Product');

// GET all products.
const getProducts = async (args, req) => {
  try {
    const products = await Product.find();
    console.log(products);
    return products;
  } catch (err) {
    console.error(err);
  };
};

// GET one specific product.
const getProduct = async (args, req) => {
  try {
    const product = await Product.findOne({ _id: args._id });
    console.log(product);
    return product;
  } catch (err) {
    console.error(err);
  };
};

// CREATE new product.
const createProduct = async (args, req) => {
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
  };
};

// UPDATE existing product.
const updateProduct = async (args, req) => {
  try {
    const product = await Product.findOne({ _id: args._id });
    product.name = args.name;
    product.price = args.price;

    const updProduct = await product.save();

    console.log(updProduct);
    return updProduct;
  } catch (err) {
    console.error(err);
  };
};

// DELETE existing product.
const deleteProduct = async (args, req) => {
  try {
    const product = await Product.deleteOne({ _id: args._id });
    if (product) {
      console.log('Deleted successfully!', product);
      return product;
    } else {
      console.log('Delete operaition failed!', product);
      return product;
    }
  } catch (err) {
    console.error(err);
  };
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};