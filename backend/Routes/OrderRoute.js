const router = require('express').Router();
const {authenticate} = require('../middlewares/Auth');
const {CreateOrder,SingleOrder,AllUsersOrder,getOrdersBySellerId} = require('../Controllers/OrderController.js');


router.route('/NewOrders/:id').post(authenticate,CreateOrder);
router.route('/NewOrder/:id').post(authenticate, SingleOrder);
router.route('/MyOrders/:id').get(authenticate,AllUsersOrder);
router.route('/SellerOrders/:id').get(authenticate,getOrdersBySellerId);



module.exports = router;