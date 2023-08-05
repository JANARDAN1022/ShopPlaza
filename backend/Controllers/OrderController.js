const ErrorHandler = require('../middlewares/ErrorHandler');
const catchasyncerror = require('../middlewares/AsyncError');
const Order = require('../Models/OrderModel.js');
const Cart = require('../Models/CartModel.js');
const User = require('../Models/UserModel.js');
const Seller = require('../Models/SellerModel.js');
const mongoose = require('mongoose');
//const Products = require('../Models/ProductModel.js');



//Order Single Item 
exports.SingleOrder = catchasyncerror(async(req,res,next)=>{
    const UserId = req.params.id;
    const {Shippinginfo,ProductId} = req.body;

const UserExists = await User.findById(UserId);
if(UserExists){
const ProductExists = await Cart.find({ItemId:ProductId});
if(!ProductExists){
    next({message:'Product Does Not Exist Error 404',statusCode:404});
}
const SubTotal = ProductExists[0]?.price * ProductExists[0]?.quantity;
const ShippingCharges = SubTotal>50000?SubTotal*2/100:SubTotal>10000 && SubTotal<50000?(SubTotal*1)/100:0;
const FinalAmount = SubTotal + ShippingCharges;
const NewOrder = await Order.create({
    ShippingInfo:{
        state:Shippinginfo.state,
        city:Shippinginfo.city,
        address:Shippinginfo.address,
        phoneNo:Shippinginfo.phoneNo,
        pincode:Shippinginfo.pincode,
        email:Shippinginfo.email,
        PlaceType:Shippinginfo.PlaceType,
    },
    OrderItems:ProductExists,
    UserInfo:UserId,
    Total:FinalAmount
});

await Cart.deleteOne(ProductExists[0]);
res.status(200).json({success:true,NewOrder}); 
}else{
    next({message:'User Does Not Exist Error 404',statusCode:404});
}

})






//Create Orders/Recieve Orders In Database for CartItems (More Than One)
exports.CreateOrder = catchasyncerror(async(req,res,next)=>{
    const userid= req.params.id;
    const {Shippinginfo,CartItems} = req.body;
    const UserExists = await User.findById(userid);
    if(UserExists){
    const TotalCal = await Cart.find({userId:userid});
    if(TotalCal.length<1){
        next({message:'Error No Items Found Please Re Check',statusCode:404});
    }else{
    const SubTotal = TotalCal.reduce(
        (sum,items)=>sum + items.quantity * items.price,0
    );
    const ShippingCharges = SubTotal>50000?SubTotal*2/100:SubTotal>10000 && SubTotal<50000?(SubTotal*1)/100:0;
    const FinalAmount = SubTotal + ShippingCharges;
    
    const NewOrder = await Order.create({
        ShippingInfo:{
            state:Shippinginfo.state,
            city:Shippinginfo.city,
            address:Shippinginfo.address,
            phoneNo:Shippinginfo.phoneNo,
            pincode:Shippinginfo.pincode,
            email:Shippinginfo.email,
            PlaceType:Shippinginfo.PlaceType,
        },
        OrderItems:CartItems,
        UserInfo:userid,
        Total:FinalAmount,
    });
    await Cart.deleteMany({});
    res.status(200).json({success:true,NewOrder});
    }
}else{
        next({message:'User Does Not exist, 404 Error',statusCode:404});
    }
});



//Get All Orders Of A User
exports.AllUsersOrder = catchasyncerror(async(req,res,next)=>{
    const userid = req.params.id;
    const UserExists = await User.findById(userid);
    if(UserExists){
    const orders = await Order.find({UserInfo:userid});
    res.status(200).json({success:true,orders});
    }else{
        next({message:'User Does Not Exist,404 Not Found', statusCode:404});
    }
});


// Find orders with the same seller ID and populate product and user information
exports.getOrdersBySellerId = catchasyncerror(async (req, res, next) => {
    const sellerId = req.params.id;
    const SellerExists = await Seller.findById(sellerId);
    if(SellerExists){
    const orders = await Order.aggregate([
        {
            $match: {
              'OrderItems.SellerInfo.ID':new mongoose.Types.ObjectId(sellerId),
            },
          },
        ]);
    res.status(200).json({ success: true, orders });
    }else{
        next({message:'Seller Not Found Error 404',statusCode:404});
    }  
});



//Cancel Order Req






//Return Or Exchange Order Req
