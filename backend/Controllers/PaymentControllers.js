const ErrorHandler = require('../middlewares/ErrorHandler');
const catchasyncerror = require('../middlewares/AsyncError');
const Cart = require('../Models/CartModel');
const stripe = require('stripe')(process.env.STRIPE_SEC_KEY);


// Process Payment
exports.processPayment = catchasyncerror(async (req, res, next) => {
    const {UserId} = req.body;

    
    // Calculate the total amount to charge the customer (including any taxes, shipping, etc.)
    const cartItems = await Cart.findById({userId:UserId});
    if(!cartItems){
      next({message:'No CartItems Cannot Place Order',statusCode:404})
    }
   
    const total = cartItems.reduce(
      (sum,items)=>sum + items.quantity * items.price
    )
    const shippingCharges = total >10000?(total*1)/100:total>50000?(total*2/100):0;
    const totalAmount = total + shippingCharges; 
    // Perform any necessary calculations based on your requirements
    
    // Create a Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Amount in cents
      currency: 'inr', // Change to your desired currency
      metadata: {
        // Add any additional metadata you need
        Company:'ShopPlaza'
      },
    });
  
    // Send the client secret to the frontend
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  });

  exports.getTotalAmount = catchasyncerror(async(req,res,next)=>{
    const Id = req.params.id;
const cartItems = await Cart.find({userId:Id}).lean();
    if(!cartItems){
      next({message:'No CartItems Cannot Place Order',statusCode:404})
    }
   
    const total = cartItems.reduce(
      (sum,items)=>sum + items.quantity * items.price,0
    )
    const shippingCharges = total >10000 && total<50000?(total*1)/100:total>50000?(total*2/100):0;
    const totalAmount = total + shippingCharges; 

    res.status(200).json({success:true,totalAmount});

  })
  

  //Get Stripe Api Key in Frontend
exports.StripeApiKey = catchasyncerror(async(req,res,next)=>{
  res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY});
});

