const router = require('express').Router();
const {authenticate} = require('../middlewares/Auth'); 
const {RegisterUser,LoginUser,logout ,userDetail,updateUser,ForgotPassword} = require('../Controllers/UserController');



router.route('/Register').post(RegisterUser);
router.route('/Login').post(LoginUser);
router.route('/Logout').get(logout);
router.route('/Me').get(authenticate,userDetail);
router.route('/password/reset').post(ForgotPassword);
router.route('/Update/:id').put(authenticate,updateUser);

module.exports = router