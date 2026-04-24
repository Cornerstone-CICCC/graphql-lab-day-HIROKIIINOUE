import { Customer, ICustomer } from "../models/customer.model";

const getAllCustomers = async () => {
  const customers = await Customer.find();
  return customers;
};

const getCustomerById = async (id: string) => {
  const customer = Customer.findById(id);
  return customer;
};

const addCustomer = async (data: Partial<ICustomer>) => {
  const newCustomer = await Customer.create(data);
  return newCustomer;
};

const updateCustomer = async (id: string, data: Partial<ICustomer>) => {
  const updatedCustomer = await Customer.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedCustomer;
};

const deleteCustomer = async (id: string) => {
  const deletedCustomer = await Customer.findByIdAndDelete(id);
  if (!deletedCustomer) {
    return false;
  }
  return true;
};

export default {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
