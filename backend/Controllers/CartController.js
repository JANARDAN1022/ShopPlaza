const ErrorHandler = require('../middlewares/ErrorHandler');
const catchasyncerror = require('../middlewares/AsyncError');
const Cart = require('../Models/CartModel.js');



//Add To Cart
exports.AddToCart = catchasyncerror(async(req,res,next)=>{
const {ItemId,name,imgUrl,price,quantity,stock} = req.body;
const Id = req.params.id;

const AlreadyExists = await Cart.findOne({ItemId});




if(!AlreadyExists){
const CartItem = await Cart.create({
    userId:Id,
    ItemId,
    name,
    imgUrl,
    price,
    quantity,
    stock
});

    res.status(200).json({success:true,CartItem});
}

});


//Get All items For Specific user
exports.GetUsersCartItems = catchasyncerror(async(req,res,next)=>{
const Id = req.params.id;

const cartItems = await Cart.find({userId:Id});
if(!cartItems){
    next({message:"NoT Found Try Again With Correct Details",statusCode:404});
}

if(cartItems.length<1){
    next({message:"No Items in Cart, Add to see Items",statusCode:200});
}

res.status(200).json({success:true,cartItems});

});

//Get Specific Item
exports.GetSpecificitem = catchasyncerror(async(req,res,next)=>{
    const Id = req.params.id;
    const Item = await Cart.findOne({ItemId:Id});
    if(!Item){
        next({message:'Inavlid Id Product Doesnt Exist In Cart',statusCode:404});
    }

    res.status(200).json({success:true,Item});
})


//Delete Items From Cart
exports.DeleteCartItems = catchasyncerror(async(req,res,next)=>{
    const Id = req.params.id;
    const Itemexists = Cart.findById(Id);
    if(!Itemexists){
        next({message:'Item Does Not Exist ,Id Incorrect',statusCode:404});
    }

     await Cart.findByIdAndDelete(Id);  
    res.status(200).json({success:true,message:"Cart Item Removed"});
    
    });


//Delete All Items In Cart (Required After Ordering)
exports.DeleteAllItems = catchasyncerror(async(req,res,next)=>{
    const Id = req.params.id;

const cartItems = await Cart.find({userId:Id});
if(!cartItems){
next({message:'Invalid UserId',statusCode:404});
}

    await Cart.deleteMany({});
  res.status(200).json({success:true,message:'Cart Cleared'});

})

// Update Items Quantity
exports.UpdateItemQuantity = catchasyncerror(async(req,res,next)=>{
    const Id = req.params.id;
    const {quantity} = req.body;
    const updatedItem = await Cart.findByIdAndUpdate(Id,{quantity},{new:true});

    res.status(200).json({success:true,updatedItem});
})

