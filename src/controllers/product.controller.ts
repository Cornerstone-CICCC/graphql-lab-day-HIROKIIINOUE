import { IProduct, Product } from "../models/product.model";

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProductById = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};

const addProduct = async (data: Partial<IProduct>) => {
  const newProduct = await Product.create(data);
  return newProduct;
};

const updateProduct = async (id: string, data: Partial<IProduct>) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedProduct;
};

const deleteProduct = async (id: string) => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    return false;
  }
  return true;
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
