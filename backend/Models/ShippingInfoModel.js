const mongoose = require('mongoose');




const ShippingInfoSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    address:{
       type:String,
       required:[true,'Please Enter Your Address'],
    },
    city:{
     type:String,
     required:[true,'Please Enter Your City'],
    },
    state:{
        type:String,
        required:[true,'Please Enter Your State'],
    },
    pincode:{
      type:Number,
      required:[true,'Please Enter Your PinCode'],
    },
    phoneNo:{
        type:Number,
        unique:true,
    },
    PlaceType:{
        type:String,
        required:[true,'Please Enter PlaceType']
    }

});




module.exports = mongoose.model('ShippingInfo',ShippingInfoSchema);