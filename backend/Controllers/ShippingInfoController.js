const ErrorHandler = require('../middlewares/ErrorHandler');
const catchasyncerror = require('../middlewares/AsyncError');
const ShippingInfo = require('../Models/ShippingInfoModel.js');




//Creating Shippininfo
exports.CreateShippingInfo = catchasyncerror(async(req,res,next)=>{
    const Id = req.params.id;
    const {address,city,state,pincode,phoneNo,email,PlaceType} = req.body;

    if(phoneNo.length <10){
        next({message:'Inavlid Phone Number',statusCode:404});
    }


    const ShippingAddress = await ShippingInfo.create({
        userId:Id,
        address,
        city,
        state,
        pincode,
        phoneNo,
        email,
        PlaceType,
    });
    res.status(200).json({success:true,ShippingAddress});    
});

//Get All ShippingInfo's added by specific user
exports.GetUsersShippingInfo = catchasyncerror(async(req,res,next)=>{
    const Id = req.params.id;
    const shippingInfo = (await ShippingInfo.find({userId:Id})).reverse();
    if(!ShippingInfo){
        next({message:"NoT Found Try Again With Correct Details",statusCode:404});
    }
    
    if(shippingInfo.length <1){
        next({message:"No Address Saved Add New Address",statusCode:404});
    }else{
    res.status(200).json({success:true,shippingInfo});
    }
});

//Update/Edit Address
exports.UpdateShippingInfo = catchasyncerror(async(req,res,next)=>{
    const Id = req.params.id;
    const Info = req.body;
    const Infoexists = await ShippingInfo.findById(Id);
    if(!Infoexists){
        next({message:'Invalid Id Or Infor Doesnt Exist Try Again Or Add New Info First',statusCode:404})
    }
    const UpdatedInfo = await ShippingInfo.findByIdAndUpdate(Id, Info, {
        new: true,
        runValidators: true,
        useFindAndModify: false
      });
      res.status(200).json({success:true,UpdatedInfo});
});

//Delete Address
exports.DeleteShippingInfo = catchasyncerror(async(req,res,next)=>{
    const Id = req.params.id;
    await ShippingInfo.findByIdAndDelete(Id);
    return res.status(200).json('Address Removed Successfully');
});