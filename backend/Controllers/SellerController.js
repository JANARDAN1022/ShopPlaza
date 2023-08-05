const ErrorHandler = require("../middlewares/ErrorHandler");
const catchasyncerror = require("../middlewares/AsyncError");
const Seller = require("../Models/SellerModel.js");
const User = require("../Models/UserModel.js");

//Register User As Seller And Update Role As Admin
exports.RegisterSeller = catchasyncerror(async (req, res, next) => {
    const userid = req.params.id;
    const { SellerEmail, SellingCategory, SellerPassword,FullName,PhoneNo,BuisnessName,BuisnessAddress,PaymentMethod} = req.body;
  
    const userexists = await User.findById(userid);
    if(!userexists){
        next({message:'User Not Found',statusCode:404});
    }
    const NewSeller = await Seller.create({
        userId:userid,
        SellerEmail,
        SellerPassword,
        SellingCategory,
        FullName,
        PhoneNo,
        BuisnessName,
        BuisnessAddress,
        PaymentMethod,
    });
   
    const UpdateUser = await User.findByIdAndUpdate(userid,{role:'admin'});
     
    res.status(200).json({success:true,NewSeller,UpdateUser});

});


//Delete Seller Account And Change Users Role to user
exports.DeleteSellerAccount = catchasyncerror(async(req,res,next)=>{
    const {SellerId,UserId}=req.params;
  


    const SellerExists = await Seller.findById(SellerId);
    if(!SellerExists){
        next({message:'Seller Not Found',statusCode:404});
    }
    const UserExists = await User.findById(UserId);
    if(!UserExists){
        next({message:'User Not Found',statusCode:404});
    }
    await User.findByIdAndUpdate(UserId,{role:'user'});
    await Seller.findByIdAndDelete(SellerId);
    

    res.status(200).json({success:true,message:'Seller Account Deleted Succesfully'});
});