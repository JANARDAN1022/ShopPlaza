const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    ShippingInfo:{
        state:{
            type:String,
            required:[true,'Please Enter State Info'],
        },
        city:{
            type:String,
            required:[true,'Please Enter City Info'],
        },
        address:{
            type:String,
            required:[true,'Please Enter Shipping Address'],
        },
        phoneNo:{
            type:Number,
            required:[true,'Please Enter Your PhoneNo'],
        },
        pincode:{
            type:Number,
            required:[true,'Please Enter Pincode Info'],
        },
        email:{
            type:String,
            required:[true,'Please Enter Email Info'],
        },
        PlaceType:{
            type:String,
            required:[true,'Please Enter PlaceType Info'],
        },
    },
    OrderItems:[
        {
            name:{
                    type:String,
                    required:[true,'Please Enter Product Name'],
            },
            price:{
                type:Number,
                required:[true,'Please Enter Product Price'],
                maxLength:[8,'Price Cannot exceed 8 Digits']
            },
            quantity:{
                type:Number,
                required:[true,'Please Provide Product Quantity']
            },
            stock:{
                type:Number,
                required:[true,'Please Enter Product Stock'],
            },
            imgUrl:{
                type:String,
                required:[true,'Please Enter Product IMG']
            },
            ItemId:{
                type:mongoose.Schema.Types.ObjectId,
                 ref:'products'
            },
            SellerInfo:{
                ID:{ 
                    type:mongoose.Schema.Types.ObjectId,
                   },
                   BuisnessName:{
                    type:String,
                   },
                   FullName:{
                    type:String,
                   },
                   Email:{
                    type:String,
                   }
            }

        }
    ],
    UserInfo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
    },
    Total:{
        type:Number,
        required:[true,'Amount Cannot Be Undefined']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model('Orders',OrdersSchema);