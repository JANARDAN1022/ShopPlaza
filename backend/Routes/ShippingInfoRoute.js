const router = require('express').Router();
const {authenticate} = require('../middlewares/Auth'); 
const {CreateShippingInfo,GetUsersShippingInfo,DeleteShippingInfo} = require('../Controllers/ShippingInfoController.js')




router.route('/ShippingInfo/:id').post(authenticate,CreateShippingInfo).get(authenticate,GetUsersShippingInfo).delete(authenticate,DeleteShippingInfo);




module.exports = router;