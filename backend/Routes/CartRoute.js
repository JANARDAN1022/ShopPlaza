const router = require('express').Router();
const {authenticate} = require('../middlewares/Auth');
const {AddToCart,GetUsersCartItems,DeleteCartItems,UpdateItemQuantity,GetSpecificitem,DeleteAllItems} =require('../Controllers/CartController');



router.route('/CartItems/:id').post(authenticate,AddToCart).get(authenticate,GetUsersCartItems).delete(authenticate,DeleteCartItems).put(authenticate,UpdateItemQuantity);
router.route('/CartItem/:id').get(authenticate,GetSpecificitem);
router.route('/ClearCart/:id').delete(authenticate,DeleteAllItems);


module.exports = router;