const router = require('express').Router();
const {authenticate} = require('../middlewares/Auth'); 
const {CreateShippingInfo,GetUsersShippingInfo} = require('../Controllers/ShippingInfoController.js')




router.route('/ShippingInfo/:id').post(authenticate,CreateShippingInfo).get(authenticate,GetUsersShippingInfo);




module.exports = router;