const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
       userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users',
       },
       ItemId:{
              type:mongoose.Schema.Types.ObjectId,
              ref:'products',
       },
       name:{
        type:String,
        required:[true,'Enter Product Name']
       },
       imgUrl:{
        type:'string',
        required:[true,'Enter ImgUrl']
       },
       price:{
        type:Number,
        required:[true,'Enter Product Price']
       },
       quantity:{
        type:Number,
        required:[true,'Enter Product quantity']
       },
       stock:{
        type:Number,
        required:[true,'Enter Product Stock'] 
       }
});


module.exports = mongoose.model('Cart',CartSchema);