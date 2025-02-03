import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    costumer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        lowercase: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      run: {
        type: String,
        required: true,
      },
    },
    shipping_info: {
      addres: {
        type: String,
        required: true,
      },
      region: {
        type: String,
        required: true,
      },
      indications: {
        type: String,
        default: "",
      },
    },
    //*This needs reviewing as i need each state to have it's own timestamp
    status: {
      state: {
        type: String,
        required: true,
        enum: ["Pending", "Paid", "OnRoute", "Delivered", "Cancelled"],
        default: "Pending",
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
    details: {
      products: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId, // Reference to Product
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
      paid_amount: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

orderSchema.index({ "customer.name": "text", "customer.email": "text" });

const Order = mongoose.model("Order", orderSchema);

export default Order;
