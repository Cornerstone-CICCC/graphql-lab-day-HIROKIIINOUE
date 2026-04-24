import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  productId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
}

const OrderSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
