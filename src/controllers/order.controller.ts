import { IOrder, Order } from "../models/order.model";

const getAllOrders = async () => {
  const orders = await Order.find();
  return orders;
};

const getOrderById = async (id: string) => {
  const order = await Order.findById(id);
  return order;
};

const addOrder = async (data: Partial<IOrder>) => {
  const newOrder = await Order.create(data);
  return newOrder;
};

const updateOrder = async (id: string, data: Partial<IOrder>) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedOrder;
};

const deleteOrder = async (id: string) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  if (!deletedOrder) {
    return false;
  }
  return true;
};

export default {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
};
