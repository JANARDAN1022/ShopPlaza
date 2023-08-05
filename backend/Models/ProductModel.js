const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Product Name'],
        trim:true,
        index: 'text'
    },
    description:{
        type:String,
        required:[true,'Please Enter Product Description']
    },
    price:{
        type:Number,
        required:[true,'Please Enter Product Price'],
        maxLength:[8,'Price Cannot exceed 8 Digits']
    },
    category:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
         type:String,
         required:true
        },
        url:{
            type:String,
            required:true
        }
     }],
     category:{
        type:String,
        required:[true,'Please Enter Product Category']
     },
     stock:{
        type:Number,
        required:[true,'Please enter product Stock'],
        maxLength:[4,'stockcannot exceed 4 digits']
     },
     numofReviews:{
        type:Number,
        default:0
     },
     reviews:[
        {
         name:{
            type:String,
            required:true
         },
         rating:{
            type:Number,
            required:true
         },
         comment:{
            type:String,
            required:true
         }
     }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    SellerInfo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Seller',
    }
})

module.exports = mongoose.model('Products',productSchema);