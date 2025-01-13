import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    //I want this to be calculated using the ((totalcost + tax + profit) - discount)
    //should never be greater than the cost //*tax is const 19%
    //need to change it though, since it should not be less than the total cost
    priceTag: {
      type: Number,
      required: true,
      min: 0,
    },
    total_cost: {
      cost: { type: Number },
      shipping: { type: Number },
    },
    discount: {
      amount: { type: Number, default: 0 },
      status: { type: Boolean, default: false },
    },
    //sku for google analytics
    sku: {
      type: Number,
      unique: true,
    },
    //this might change since it is for fetching the info of the products
    urls: [
      {
        url: { type: String, required: true },
        priority: { type: Number, required: true },
      },
    ],
    isAvailable: {
      type: Boolean,
      required: true,
    },
    images: [
      {
        //have url of the image
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    //the validator still in progress
    category: [
      {
        type: String,
        enum: ["Figure"],
      },
    ],
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

productSchema.pre("save", function (next) {
  const taxRate = 0.19;
  const profit = 0.1;
  const totalCost = this.total_cost.cost + this.total_cost.shipping;
  const discount = this.discount.status ? this.discount.amount : 0;
  const basePrice = totalCost + totalCost * taxRate + totalCost * profit;

  //ensure priceTag is not less than total cost or greater than base price
  this.priceTag = Math.max(totalCost, basePrice - discount);
});

const Product = mongoose.model("Product", productSchema);

export default Product;
