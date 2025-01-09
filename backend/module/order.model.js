import mongoose from "mongoose";

const orderScehma = new mongoose.Schema(
  {
    costumer: {
      name: {},
      email: {},
      phone: {},
      run: {},
    },
    shipping_info: {
      addres: {},
      region: {},
      indications: {},
    },
    //the idea is for this to update where in the shipping process the order is
    //and the timestamp is to indicate when was updated
    //this is up for change in the future
    status: {
      state: {},
      timestamp: {},
    },
    details: {
      products: [
        {
          ids: {},
          amount: {},
        },
      ],
      paid_amount: {},
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);
const Order = mongoose.Model("Order", orderScehma);

export default Order;
