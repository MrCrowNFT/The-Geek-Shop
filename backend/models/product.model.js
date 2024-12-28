import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        //Price and cost calculculation properties
        //need to check the math
        //((cost + shipping)*(profit+tax))/discount
        priceTag: {
            type: Number,
            required: true,
            min: 0,
        },
        //price and shipping gotten from aliexpress
        cost:{
            type: Number,
            required: true,
        },
        shipping:{
            type: Number,
            required: true,
        },
        profit:{
            type: Number,
            required: true,
        },
        tax:{
            type: Number,
            required: true,
        },
        discount:{
            amount: {type: Number, default:0 },
            status: {type: Boolean, default: false},
        },

        availability:{
            type: Boolean,
            required: true,
        },
        //will be mainly use for google 
        sku:{
            type: Number,
            required: true,
            unique: true,
        },
        //the url might change in the future, since the primary function is for
        //the to facilitate access to the product info in aliexpress
        //to update availability, cost and price
        //As of now the priority will determine the order in which the providers will be 
        //consulted to fetch the info, i will only consult the next one if one is unavailable
        urls:[{
            url: { type: String, required: true },
            priority: { type: Number, required: true }, 
        }],
        images:[{
            type: String,
            required: true,
        }],
        description:{
            type: String,
            required: true,
            maxlength: 500,
        },
        //the validator still in progress since there will be many, many categories
        category:[{
            type: String,
            enum: ["Figure", "Plushie"],
            required: false
        }]

    },
    {
      timestamps: true //createdAt, updatedAt
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;