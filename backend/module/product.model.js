import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        //I want this to be calculated using the cost + shipping+ tax + profit - discount
        //should never be greater than the cost 
        priceTag:{
            type:Number,
            required: true,
            min: 0,
        },
        cost:{
            type:Number,
            required: true,
        },
        shipping:{
            type:Number,
            required: true,
        },
        profit:{
            type:Number,
            required: true,
        },
        //Hard coded thing, it wont change, so maybe delete this
        tax:{
            type:Number,
            required: true,
        },
        discount:{
            amount: {type: Number, default:0},
            status: {type: Boolean, default: false}
        },
        //sku for google analytics
        sku:{
            type: Number,
            unique: true,
        },
        //this might change since it is for fetching the info of the products
        url:[{
            url: {type: String, required: true},
            priority: {type: Number, required: true},
        }],
        isAvailable:{
            Type: Boolean,
            required: true,
        },
        images:[{
            //have url of the image
            type: String,
            required:true,
        }],
        description:{
            type: String,
            required: true,
            maxlength: 500,
        },
        //the validator still in progress
        category:[{
            type: String,
            enum: ["Figure","Plushie"],
            required: false,
        }]
    },
    {
        timestamps: true //createdAt, updatedAt
    }
)
const Product = mongoose.model("Product", productSchema);

export default Product;