import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url : {
        type : String,
        required : true,
        unique : true
    },
    currency : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
    },
    price : {
        type : String,
        required : true,
    },
    priceWithoutDiscount : {
        type : String,
        required : true,
    },
    priceHistory : [
        {
            price : {type : String, required : true},
            date : {type : Date, default : Date.now()}, 
        }
    ],
    lowestPrice : {type : Number},
    highestPrice : {type : Number},
    averagePrice : {type : Number},
    discountRate : {type : Number},
    description : {type : String},
    category : {type : String},
    reviewsCount : {type : Number},
    isOutOfStock : {type : Boolean},
    users : [
        {
            email : {type : String, required : true},
        },
    ]
},{
    timestamps : true
})

const Product = mongoose.models.Product || mongoose.model("Product" , productSchema) ;
export default Product;