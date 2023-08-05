const mongoose = require('mongoose');
const validator = require('validator');

const SellerSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    SellerEmail:{
      type:String,
      required:[true,'Please Enter Your Email'],
      unique:true,
      validate:[validator.isEmail,"Please Enter a Valid Email"]
    },
    SellerPassword:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minlength:[6,"Password Should be of Atlease 6 Characters"],
    },
    SellingCategory:{
       type:[String],
       required:[true,'Please Select Either All or a Specific Category']
    },
    FullName:{
        type:String,
        required:[true,'Please Enter Your Full Name'],
    },
    PhoneNo:{
        type:Number,
        required:[true,'Please Enter Your Phone No'],
    },
    BuisnessName:{
        type:String,
        required:[true,'Please Enter Your Buisness Name'],
    },
    BuisnessAddress:{
        type:String,
        required:[true,'Please Enter Your Buisness Address'],
    },
    PaymentMethod:{
        type:String,
        required:[true,'Please Enter Your Recieving Payment Method'],
    }
});


module.exports = mongoose.model("Seller",SellerSchema);
