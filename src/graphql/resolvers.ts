import mongoose from "mongoose";
import customerController from "../controllers/customer.controller";
import orderController from "../controllers/order.controller";
import productController from "../controllers/product.controller";
import { ICustomer } from "../models/customer.model";
import { IOrder } from "../models/order.model";
import { IProduct } from "../models/product.model";

// Finish the resolvers
export const resolvers = {
  Query: {
    products: async () => await productController.getAllProducts(),
    customers: async () => await customerController.getAllCustomers(),
    orders: async () => await orderController.getAllOrders(),
    getProductById: async (_: unknown, { id }: { id: string }) =>
      await productController.getProductById(id),
    getCustomerById: async (_: unknown, { id }: { id: string }) =>
      await customerController.getCustomerById(id),
  },
  Product: {
    customers: async (parent: { id: string }) => {
      const allCustomers = await customerController.getAllCustomers();
      const allOrders = await orderController.getAllOrders();
      const targetOrders = allOrders.filter((order) => {
        return String(order.productId) === String(parent.id);
      });

      const customer = allCustomers.filter((customer) => {
        const judge = targetOrders.some((order) => {
          return String(order.customerId) === String(customer.id);
        });
        return judge;
      });
      return customer;
    },
  },
  Customer: {
    products: async (parent: { id: string }) => {
      const allProducts = await productController.getAllProducts();
      const allOrders = await orderController.getAllOrders();
      const targetOrders = allOrders.filter((order) => {
        return String(order.customerId) === String(parent.id);
      });

      const products = allProducts.filter((product) => {
        const judge = targetOrders.some((order) => {
          return String(order.productId) === product.id;
        });
        return judge;
      });
      return products;
    },
  },
  Order: {
    product: async (parent: { productId: string }) => {
      const product = await productController.getProductById(parent.productId);
      return product;
    },
    customer: async (parent: { customerId: string }) => {
      const customer = await customerController.getCustomerById(
        parent.customerId,
      );
      return customer;
    },
  },
  Mutation: {
    addProduct: async (_: unknown, { productName, productPrice }: IProduct) =>
      await productController.addProduct({ productName, productPrice }),
    editProduct: async (
      _: unknown,
      {
        id,
        productName,
        productPrice,
      }: { id: string; productName: string; productPrice: number },
    ) =>
      await productController.updateProduct(id, { productName, productPrice }),
    removeProduct: async (_: unknown, { id }: { id: string }) =>
      await productController.deleteProduct(id),

    addCustomer: async (
      _: unknown,
      { firstName, lastName, email }: ICustomer,
    ) => await customerController.addCustomer({ firstName, lastName, email }),
    editCustomer: async (
      _: unknown,
      {
        id,
        firstName,
        lastName,
        email,
      }: { id: string; firstName: string; lastName: string; email: string },
    ) =>
      await customerController.updateCustomer(id, {
        firstName,
        lastName,
        email,
      }),
    removeCustomer: async (_: unknown, { id }: { id: string }) =>
      await customerController.deleteCustomer(id),

    addOrder: async (_: unknown, { productId, customerId }: IOrder) =>
      await orderController.addOrder({ productId, customerId }),
    editOrder: async (
      _: unknown,
      {
        id,
        productId,
        customerId,
      }: {
        id: string;
        productId: mongoose.Types.ObjectId;
        customerId: mongoose.Types.ObjectId;
      },
    ) => await orderController.updateOrder(id, { productId, customerId }),
    removeOrder: async (_: unknown, { id }: { id: string }) =>
      await orderController.deleteOrder(id),
  },
};
